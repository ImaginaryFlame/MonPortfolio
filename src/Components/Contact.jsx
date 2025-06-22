import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage.jsx';

export const Contact = ({ onClose }) => {
    const { t } = useLanguage();
    const formInitialDetails = {
        nom: '',
        prenom: '',
        email: '',
        téléphone: '',
        sujet: '',
        message: '',
    };

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState(t('contact.form.send'));
    const [status, setStatus] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [submissionFailed, setSubmissionFailed] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText(t('contact.form.sending'));
        setSubmissionFailed(false);
        setStatus({});

        try {
            let response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formDetails),
            });
            let result = await response.json();
            setFormDetails(formInitialDetails);
            if (result.code === 200) {
                setStatus({ success: true, message: t('contact.messages.success') });
            } else {
                setStatus({ success: false, message: t('contact.messages.error') });
                setSubmissionFailed(true);
                setTimeout(() => setSubmissionFailed(false), 800);
            }
        } catch (error) {
            setStatus({ success: false, message: t('contact.messages.connectionError') });
            setSubmissionFailed(true);
            setTimeout(() => setSubmissionFailed(false), 800);
        } finally {
            setButtonText(t('contact.form.send'));
        }
    };

    return (
        <div className={`fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm
                        transition-all duration-300 ease-in-out
                        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
             onClick={handleClose}>
            <div className={`bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative
                            ${submissionFailed ? 'animate-shake ring-4 ring-red-500/50' : ''}`}
                 onClick={e => e.stopPropagation()}>
                {submissionFailed && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl pointer-events-none z-20" />
                )}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-gray-200/90 backdrop-blur-sm rounded-full p-2
                               hover:bg-gray-300 transition-all duration-200 z-40 shadow-lg
                               hover:scale-110 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 relative z-30">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('contact.title')}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input type="text" value={formDetails.nom} placeholder={t('contact.form.nom')} onChange={(e) => onFormUpdate('nom', e.target.value)} 
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200" />
                            <input type="text" value={formDetails.prenom} placeholder={t('contact.form.prenom')} onChange={(e) => onFormUpdate('prenom', e.target.value)} 
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200" />
                            <input type="email" value={formDetails.email} placeholder={t('contact.form.email')} onChange={(e) => onFormUpdate('email', e.target.value)} 
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200" />
                            <input type="tel" value={formDetails.téléphone} placeholder={t('contact.form.telephone')} onChange={(e) => onFormUpdate('téléphone', e.target.value)} 
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200" />
                        </div>
                        <div className="mb-4">
                            <input type="text" value={formDetails.sujet} placeholder={t('contact.form.sujet')} onChange={(e) => onFormUpdate('sujet', e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200" />
                        </div>
                        <div className="mb-6">
                            <textarea rows="6" value={formDetails.message} placeholder={t('contact.form.message')} onChange={(e) => onFormUpdate('message', e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-y" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transform hover:scale-105 active:scale-95">
                            <span>{buttonText}</span>
                        </button>
                        {status.message &&
                            <p className={`mt-4 text-center ${status.success ? "text-green-500" : "text-red-500"}`}>{status.message}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact; 