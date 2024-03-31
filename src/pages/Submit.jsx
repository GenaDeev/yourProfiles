import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        img: '',
        sum: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    };

    const handleNextStep = () => {
        if (validateStep()) {
            setCurrentStep(currentStep + 1);
        } else {
            alert("Please fill all fields before proceeding.");
        }
    };

    const validateStep = () => {
        const inputs = document.querySelectorAll(`#step${currentStep} input, #step${currentStep} textarea`);
        for (const input of inputs) {
            if (!input.value.trim()) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        handleNextStep();
        const newPerson = {
            id: generateRandomId(),
            name: formData.name,
            age: formData.age,
            img: formData.img,
            sum: formData.sum
        };
        
        try {
            const response = await fetch('https://ubiquitous-neighborly-waiter.glitch.me/api/persons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPerson)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setCurrentStep(4);
        } catch (error) {
            console.error('There was an error submitting the form:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div id="content" className="h-full mb-40 w-full items-center justify-center flex flex-col">
                <form onSubmit={handleSubmit} className="items-center flex flex-col gap-4 bg-neutral-200 rounded-xl p-8">
                    <h1 className="text-2xl max-w-64 text-center">New entry for The Wall of Your Profiles</h1>
                    <div id="step1" className={currentStep === 1 ? "flex-col items-center justify-center flex" : "hidden"}>
                        <label htmlFor="name">Full Name</label>
                        <input required type="text" id="name" name='name' placeholder="John Doe" className="rounded-xl p-2" onChange={handleChange} value={formData.name}></input>
                        <label htmlFor="age">Age</label>
                        <input required type="number" id="age" name='age' placeholder="21" className="rounded-xl p-2" onChange={handleChange} value={formData.age}></input>
                    </div>
                    <div id='step2' className={currentStep === 2 ? "flex-col items-center justify-center flex" : "hidden"}>
                        <label htmlFor='img'>Image</label>
                        <input required id='img' type='url' name='img' placeholder='https://i.imgur.com/vHJLSDJsl' onChange={handleChange} value={formData.img}></input>
                    </div>
                    <div id='step3' className={currentStep === 3 ? "flex-col items-center justify-center flex" : "hidden"}>
                        <label htmlFor='sum'>Summary</label>
                        <textarea required id="sum" name="sum" onChange={handleChange} value={formData.sum}></textarea>
                    </div>
                    <div id="step4" className={currentStep === 4 ? "flex-col p-4 items-center justify-center flex" : "hidden"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-xl text-center font-semibold text-green-500 max-w-64 my-4">Your new person was added to the wall successfully. Go check!</p>
                    <Link to="/" className="flex items-center justify-center gap-2 bg-neutral-700 rounded-xl p-2 text-white fill-white hover:bg-neutral-500 transition hover:fill-neutral-200 hover:text-neutral-200">Go to Home</Link>
                </div>
                    {isSubmitting ? (
                        <button className="bg-white mt-4 p-2 rounded-xl cursor-not-allowed" disabled>Submitting...</button>
                    ) : (
                        <button type='submit' id='submitButton' className={currentStep === 3 ? "bg-white mt-4 p-2 rounded-xl hover:bg-neutral-100 hover:scale-110 active:scale-90 active:bg-neutral-300 transition" : "hidden"}>
                            Submit
                        </button>
                    )}
                </form>
                <button onClick={handleNextStep} className={currentStep < 3 ? "bg-neutral-200 mt-4 p-2 px-8 rounded-xl hover:bg-neutral-300 hover:scale-110 active:scale-90 active:bg-neutral-600 transition" : "hidden"} id="next">
                    Next
                </button>
                
            </div>
        </>
    );
}
