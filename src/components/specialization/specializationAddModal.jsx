import React from 'react'
import { useState } from "react";
import SpecializationForm from "./specializationForm";

const UG_PG_DATA = {
    UG: ["BBA", "BCA", "BA", "BCom"],
    PG: ["MBA", "MCA", "MA", "MCom", "MSC"]
};

const SpecializationAddModal = ({universityId}) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);


  return (
    <div>
        {step === 1 && (
            <>
            <h3>Selected Category</h3>
            {Object.keys(UG_PG_DATA).map((cat) =>(
                <button onClick={() => { setSelectedCategory(cat); setStep(2); }}>{cat}</button>
            ))}
            </>
        )}

        {step === 2 && (
            <>
            <h3>Selected Course ({selectedCategory})</h3>
            {UG_PG_DATA[selectedCategory].map((course) => (
                <button onClick={() => { setSelectedCourse(course); setStep(3); }}>{course}</button>
            ))}
            </>
        )}

        {step === 3 && (
            <SpecializationForm 
            selectedCourseId={getCourseIdByName(selectedCourse)}
            universityId={universityId}
            onSuccess={() => {
                setStep(1);
                setSelectedCategory(null);
                setSelectedCategory(null);
            }}
            />
        )}
    </div>
  )
}

export default SpecializationAddModal