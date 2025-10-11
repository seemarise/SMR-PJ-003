"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Pencil, Camera, Image } from "lucide-react";
import { getSignedUrl } from "@/services/classroomService/resourceApi";
import { apiClient } from "@/services/api";
import Modal from "@/components/Modal";
import StudentSelector from "@/components/StudentSelector";
import { getPeople } from "@/services/classroomService/classroomApi";
import { addAssignment, generateAssignment, getAssignmentDetail, updateAssignment } from "@/services/classroomService/assignmentApi";
import { toast } from "react-toastify";
import EditQuestionsPage from "@/components/QuestionsPage";
import GenerateQuestionsForm from "@/components/GenerateQuestionForm";
import moment from "moment";


export default function EditAssignment() {
    const router = useRouter();
    const params = useParams();
    const { class: className, section, subject, id } = params || {};
    const searchParams = useSearchParams();
    const classId = searchParams.get("classId");
    const sectionId = searchParams.get("sectionId");
    const subjectId = searchParams.get("subjectId");

    // UI states
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [showQuestions, setShowQuestions] = useState(false);

    // Handel Student Selecetion
    const [openStudentModal, setOpenStudentModal] = useState(false)
    const [showAllStudent, setShowAllStudent] = useState(true);
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])

    // Handle Questions
    const [openQuestionModal, setOpenQuestionModal] = useState(false)
    const [openAIModal, setOpenAIModal] = useState(false)
    const [MCQs, setMCQs] = useState([]);
    const [descriptive, setDescriptive] = useState([])

    // Handle Images and Documents
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const [showImageSourcePopup, setShowImageSourcePopup] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch
    } = useForm({
        defaultValues: {
            lessonName: "",
            content: "",
            additionalInfo: "",
            dueDate: "",
            instructions: "",
            submissionFormat: "",
        },
    });

    useEffect(() => {
        getPeople({ classId, sectionId, subjectId }).then(res => {
            setStudents(res.data.students)
        })
    }, [])

    useEffect(() => {
        getAssignmentDetail(id).then((res) => {
            setMCQs(res.data.assignment?.MCQs)
            setDescriptive(res.data.assignment?.descriptive)
            setSelectedStudents(res.data.assignment.studentsAssigned)
            setTopics(res.data.assignment?.topics)
            setSelectedImages(res.data.assignment.images)
            setSelectedDocs(res.data.assignment.documents)
            setShowAllStudent(res.data.assignment.isAssignedToAll)
            setShowQuestions(!!(res.data.assignment.MCQs + res.data.assignment.descriptive))
            reset({ ...res.data.assignment, dueDate: moment(res.data.assignment.dueDate).format("YYYY-MM-DD") })
        })
    }, [])

    // refs for hidden file inputs
    const docInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // React Hook Form

    let lesson = watch("lesson")
    let contents = watch("contents")

    // Handlers
    const onSubmit = async (data) => {
        // Build payload including topics, files, images, toggles
        const payload = {
            ...data,
            topics,
            MCQs,
            descriptive,
            isMCQ: !!MCQs.length,
            isAssignedToAll: !selectedStudents.length,
            studentsAssigned: selectedStudents,
            documents: selectedDocs,
            images: selectedImages,
            classId,
            sectionId,
            subjectId
        };

        console.log("Submitting assignment:", payload);
        updateAssignment(id, payload).then(res => {
            toast.success("Assignment updated");
            router.back()
        }).catch(error => {
            toast.error("Assignment updation Failed")
        })
    };

    function handleTopicsAdd() {
        const t = topic.trim().replace(",", "");
        if (t && !topics.includes(t)) {
            setTopics((p) => [...p, t]);
            setTopic("");
        }
    }

    function removeTopic(t) {
        setTopics((p) => p.filter((x) => x !== t));
    }

    function handleDocButtonClick() {
        docInputRef.current?.click();
    }

    function handleQuestionGenerate(data) {
        if (lesson && contents) {
            let params = {
                ...data,
                query: `Topics: ${lesson}. Contents: ${contents}`

            }
            generateAssignment(params).then(res => {
                setMCQs(res.data.prompt.MCQs)
                setDescriptive(res.data.prompt.descriptive)
                setOpenAIModal(false)
                setOpenQuestionModal(true)
            }).catch(() => {
                toast.error("Question generation failed")
            })
        } else {
            toast.error("Please fill content before generating question")
        }

    }

    function handleDocChange(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;


        getSignedUrl({ fileName: files[0].name, fieldName: "Assignment/Documents" }).then(res => {
            apiClient.upload(res.data.signedUrl, files[0]).then(imageUrl => {
                console.log(files)
                setSelectedDocs((prev) => [...prev, { name: files[0].name, type: files[0].type, link: imageUrl }]);
            })
        })
        // reset the input so same file can be selected again
        e.target.value = "";
    }

    function handleImageFromGalleryClick() {
        galleryInputRef.current?.click();
    }

    function handleGalleryChange(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        getSignedUrl({ fileName: files[0].name, fieldName: "Assignment/Images" }).then(res => {
            apiClient.upload(res.data.signedUrl, files[0]).then(imageUrl => {
                setSelectedImages((prev) => [...prev, imageUrl]);
            })
        })
        e.target.value = "";
    }

    function handleTakePhotoClick() {
        cameraInputRef.current?.click();
        setShowImageSourcePopup(false);
    }
    function handleCameraChange(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setSelectedImages((prev) => [...prev, ...files]);
        e.target.value = "";
    }

    function removeDoc(index) {
        setSelectedDocs((p) => p.filter((_, i) => i !== index));
    }

    function removeImage(image) {
        setSelectedImages((p) => p.filter((img) => img !== image));
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hidden file inputs */}
            <input
                ref={docInputRef}
                type="file"
                onChange={handleDocChange}
                className="hidden"
                multiple
            />
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleGalleryChange}
                className="hidden"
                multiple
            />
            <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCameraChange}
                className="hidden"
            />

            <Modal open={openStudentModal} onClose={() => { setOpenStudentModal(false) }} title={"Select Student"}>
                <StudentSelector value={selectedStudents} onChange={(c) => { setSelectedStudents(c); console.log(c); setOpenStudentModal(false) }} students={students} />
            </Modal>
            <Modal open={openQuestionModal} onClose={() => { setOpenQuestionModal(false) }} title={"Add Questions"}>
                <EditQuestionsPage onSubmit={(questions) => { setMCQs(questions.MCQs); setDescriptive(questions.descriptive); setOpenQuestionModal(false) }} value={{ MCQs, descriptive }} />
            </Modal>
            <Modal open={openAIModal} onClose={() => { setOpenAIModal(false) }} title={"Generate Questions"}>
                <GenerateQuestionsForm onGenerate={handleQuestionGenerate} onCancel={() => { setOpenAIModal(false) }} />
            </Modal>

            {/* Main content */}
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl md:font-bold">
                            Edit Assignment
                        </h1>

                        <div className="w-6" />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 md:space-y-6 bg-white rounded-lg shadow-sm p-4 md:p-8 md:rounded-xl"
                    >
                        {/* Lesson Name */}
                        <div>
                            <label className="font-medium block mb-1">Lesson Name</label>
                            <input
                                type="text"
                                {...register("lesson", { required: "Lesson Name is required" })}
                                placeholder="Enter lesson name"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                            {errors.lesson && (
                                <p className="text-red-500 text-sm mt-1">{errors.lesson.message}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="font-medium block mb-1">Content</label>
                            <div className="relative">
                                <textarea
                                    {...register("contents", { required: "Content is required" })}
                                    rows={4}
                                    placeholder="Enter the assignment content"
                                    className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3 resize-none pr-12"
                                />
                                {/* <button
                                    type="button"
                                    onClick={() => setShowImageSourcePopup(true)}
                                    className="absolute right-3 top-2 p-2 text-gray-500 hover:text-[#5074b6]transition-colors cursor-pointer"
                                >
                                    <Camera className="w-5 h-5" />
                                </button> */}
                            </div>
                            {errors.contents && (
                                <p className="text-red-500 text-sm mt-1">{errors.contents.message}</p>
                            )}
                        </div>

                        {/* Topics */}
                        <div>
                            <label className="font-medium block mb-1">Topics</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => {

                                        if (e.key === ",") {
                                            handleTopicsAdd(); // Call your login function
                                        }
                                    }}
                                    placeholder="Add a topic"
                                    className="border rounded-lg px-3 py-2 flex-1 md:px-4 md:py-3"
                                />
                                <button
                                    type="button"
                                    onClick={handleTopicsAdd}
                                    className="bg-[#5074b6]  cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Topic chips */}
                        {topics.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {topics.map((t) => (
                                    <span key={t} className="px-3 py-2 bg-lime-300 rounded-md flex items-center gap-2">
                                        <span className="text-sm">{t}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTopic(t)}
                                            className="text-xs text-red-700 font-bold ml-2 cursor-pointer"
                                            aria-label={`Remove topic ${t}`}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Additional Info */}
                        <div>
                            <label className="font-medium block mb-1">Additional Information</label>
                            <input
                                type="text"
                                {...register("additionalInfo")}
                                placeholder="Enter details"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="font-medium block mb-1">Due Date</label>
                            <input
                                type="date"
                                {...register("dueDate", { required: "Due Date is required" })}
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                            {errors.dueDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
                            )}
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="font-medium block mb-1">Instructions</label>
                            <textarea
                                {...register("instructions")}
                                placeholder="Add any specific instructions"
                                rows={3}
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3 resize-none"
                            />
                        </div>

                        {/* Submission Format */}
                        <div>
                            <label className="font-medium block mb-1">Submission Format</label>
                            <input
                                type="text"
                                {...register("submissionFormat")}
                                placeholder="E.g., PDF, Word doc"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Upload Document */}
                        <div>
                            <label className="font-medium block mb-1">Upload Document</label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleDocButtonClick}
                                    className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                                >
                                    Upload Document
                                </button>
                                <p className="text-sm text-gray-400">
                                    {selectedDocs.length === 0 ? "No documents uploaded yet" : `${selectedDocs.length} file(s) selected`}
                                </p>
                            </div>

                            {/* list selected documents */}
                            {selectedDocs.length > 0 && (
                                <div className="mt-2 flex flex-col gap-2">
                                    {selectedDocs.map((f, i) => (
                                        <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                                            <div className="text-sm">{f.name}</div>
                                            <button onClick={() => removeDoc(i)} className="text-red-600 text-sm px-2">
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Assign To */}
                        <div className="flex flex-col items-center justify-between mt-4">
                            <div className="font-medium w-full">Assign To</div>
                            <div className="flex items-center justify-between w-full">
                                <div>All Students</div>
                                <ToggleSwitch checked={showAllStudent} onChange={() => setShowAllStudent((s) => !s)} />
                            </div>

                            {!showAllStudent && (
                                <div className="w-full mt-3">
                                    <button
                                        className="bg-[#5074b6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center transition w-full"
                                        type="button"
                                        onClick={() => setOpenStudentModal(true)
                                        }
                                    >
                                        +  Select Student
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Add Images */}
                        <div>
                            <label className="font-medium block mb-1">Add Images</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleImageFromGalleryClick()}
                                    className="bg-[#5074b6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Add Image
                                </button>
                            </div>

                            {/* show selected images */}
                            {selectedImages.length > 0 && (
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {selectedImages.map((img, idx) => {
                                        return (
                                            <div key={idx} className="relative rounded overflow-hidden">
                                                <img src={img} alt={`sel-${idx}`} className="w-full h-24 object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(img)}
                                                    className="absolute top-1 right-1 bg-white/80 rounded px-1 text-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Questions Section */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">Questions</label>
                                <ToggleSwitch checked={showQuestions} onChange={() => setShowQuestions((s) => !s)} />
                            </div>

                            {showQuestions && (
                                <div className="mt-3 p-3 border rounded-lg bg-gray-50 md:p-5 md:rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-medium">{MCQs.length + descriptive.length} Questions</p>

                                    </div>

                                    <div className="flex gap-2 mt-3 flex-wrap">
                                        <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition" onClick={() => { setOpenAIModal(true) }} type="button">
                                            + Generate with AI
                                        </button>
                                        <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition cursor-pointer" onClick={() => { setOpenQuestionModal(true) }} type="button">
                                            + Add Questions
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#5074b6] hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition md:text-lg md:py-4 md:rounded-xl disabled:opacity-60"
                        >
                            {isSubmitting ? "Updating..." : "Update Assignment"}
                        </button>
                    </form>
                </div>
            </main>

            {/* Image Source Popup */}
            {showImageSourcePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 mx-4 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-center">Choose File Source</h3>

                        <div className="space-y-3">
                            <button
                                onClick={handleImageFromGalleryClick}
                                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                                type="button"
                            >
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Image className="w-4 h-4 text-[#5074b6]" />
                                </div>
                                <span>Image from Gallery</span>
                            </button>

                            <button
                                onClick={handleTakePhotoClick}
                                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                                type="button"
                            >
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-[#5074b6]" />
                                </div>
                                <span>Take Photo</span>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowImageSourcePopup(false)}
                            className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ToggleSwitch: controlled toggle used multiple places.
   - props: checked (boolean), onChange (fn)
*/
function ToggleSwitch({ checked, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange && onChange(e)}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full relative" />
        </label>
    );
}
