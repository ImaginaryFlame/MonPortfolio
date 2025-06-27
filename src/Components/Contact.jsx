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
    const [buttonText, setButtonText] = useState('Envoyer le message');
    const [status, setStatus] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        // Réinitialiser le statut quand l'utilisateur modifie le formulaire
        if (status.message) {
            setStatus({});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation côté client
        if (!formDetails.nom.trim() || !formDetails.email.trim() || !formDetails.message.trim()) {
            setStatus({ 
                success: false, 
                message: 'Veuillez remplir au minimum le nom, l\'email et le message.' 
            });
            setSubmissionFailed(true);
            setTimeout(() => setSubmissionFailed(false), 800);
            return;
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formDetails.email)) {
            setStatus({ 
                success: false, 
                message: 'Veuillez entrer une adresse email valide.' 
            });
            setSubmissionFailed(true);
            setTimeout(() => setSubmissionFailed(false), 800);
            return;
        }

        setIsSubmitting(true);
        setButtonText('📨 Envoi en cours...');
        setSubmissionFailed(false);
        setStatus({});

        try {
            console.log('🚀 Envoi du formulaire:', formDetails);
            
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formDetails),
            });
            
            console.log('📡 Réponse du serveur:', response.status);
            
            if (!response.ok) {
                throw new Error(`Erreur serveur: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('✅ Résultat:', result);
            
            if (result.code === 200) {
                setFormDetails(formInitialDetails);
                setStatus({ 
                    success: true, 
                    message: '🎉 Votre message a été envoyé avec succès ! Je vous répondrai rapidement.' 
                });
                
                // Fermer automatiquement le modal après 3 secondes
                setTimeout(() => {
                    handleClose();
                }, 3000);
                
            } else {
                throw new Error(result.error || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            
            let errorMessage = '❌ Erreur lors de l\'envoi du message. ';
            
            if (error.message.includes('fetch')) {
                errorMessage += 'Impossible de contacter le serveur. Vérifiez que le serveur de contact est démarré.';
            } else if (error.message.includes('400')) {
                errorMessage += 'Données invalides. Vérifiez vos informations.';
            } else if (error.message.includes('500')) {
                errorMessage += 'Erreur du serveur. Réessayez dans quelques instants.';
            } else {
                errorMessage += error.message || 'Réessayez dans quelques instants.';
            }
            
            setStatus({ success: false, message: errorMessage });
            setSubmissionFailed(true);
            setTimeout(() => setSubmissionFailed(false), 800);
        } finally {
            setIsSubmitting(false);
            setButtonText('Envoyer le message');
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
                
                {/* Animation de succès */}
                {status.success && (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl pointer-events-none z-20" />
                )}
                
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-gray-200/90 backdrop-blur-sm rounded-full p-2
                               hover:bg-gray-300 transition-all duration-200 z-40 shadow-lg
                               hover:scale-110 active:scale-95"
                    disabled={isSubmitting}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 relative z-30">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">💬 Contactez-moi</h2>
                        <p className="text-gray-600">Je serais ravi d'échanger avec vous sur vos projets !</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={formDetails.nom} 
                                    placeholder="Votre nom" 
                                    onChange={(e) => onFormUpdate('nom', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                <input 
                                    type="text" 
                                    value={formDetails.prenom} 
                                    placeholder="Votre prénom" 
                                    onChange={(e) => onFormUpdate('prenom', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    value={formDetails.email} 
                                    placeholder="votre.email@exemple.com" 
                                    onChange={(e) => onFormUpdate('email', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                <input 
                                    type="tel" 
                                    value={formDetails.téléphone} 
                                    placeholder="Votre numéro" 
                                    onChange={(e) => onFormUpdate('téléphone', e.target.value)} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                            <input 
                                type="text" 
                                value={formDetails.sujet} 
                                placeholder="L'objet de votre message" 
                                onChange={(e) => onFormUpdate('sujet', e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                rows="6" 
                                value={formDetails.message} 
                                placeholder="Votre message..." 
                                onChange={(e) => onFormUpdate('message', e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-y"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full py-3 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                                isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : status.success 
                                        ? 'bg-green-600 hover:bg-green-700' 
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:scale-105 active:scale-95'
                            }`}
                            disabled={isSubmitting}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isSubmitting && (
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                )}
                                {buttonText}
                            </span>
                        </button>

                        {status.message && (
                            <div className={`mt-4 p-4 rounded-lg text-center font-medium ${
                                status.success 
                                    ? "bg-green-100 text-green-700 border border-green-300" 
                                    : "bg-red-100 text-red-700 border border-red-300"
                            }`}>
                                {status.message}
                            </div>
                        )}
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>📧 Vous pouvez aussi me contacter directement à :</p>
                        <a 
                            href="mailto:imaginaryflamepro@gmail.com" 
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                            imaginaryflamepro@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 