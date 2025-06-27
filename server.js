import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const router = express.Router();

// server used to send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur de contact démarré sur le port ${PORT}`));

console.log("📧 Configuration email:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Configuré" : "❌ Manquant");

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log("❌ Erreur de configuration email:", error);
  } else {
    console.log("✅ Serveur email prêt à envoyer");
  }
});

router.post("/contact", (req, res) => {
  console.log("📨 Nouveau message reçu:", req.body);
  
  const { nom, prenom, email, téléphone, sujet, message } = req.body;
  
  // Validation basique
  if (!nom || !email || !message) {
    return res.status(400).json({ 
      code: 400, 
      error: "Champs obligatoires manquants (nom, email, message)" 
    });
  }
  
  const emailContent = {
    from: `"${nom} ${prenom}" <${process.env.EMAIL_USER}>`, // Utilise votre email comme expéditeur
    to: "imaginaryflamepro@gmail.com", // Votre adresse de réception
    replyTo: email, // L'email du visiteur pour pouvoir répondre
    subject: sujet || `Nouveau message de ${nom} ${prenom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h2 style="color: #9333EA; border-bottom: 2px solid #9333EA; padding-bottom: 10px;">
          📧 Nouveau message depuis votre portfolio
        </h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #333; margin-top: 0;">Informations du contact :</h3>
          <p><strong>📝 Nom :</strong> ${nom} ${prenom}</p>
          <p><strong>📧 Email :</strong> <a href="mailto:${email}">${email}</a></p>
          ${téléphone ? `<p><strong>📞 Téléphone :</strong> ${téléphone}</p>` : ''}
          ${sujet ? `<p><strong>📋 Sujet :</strong> ${sujet}</p>` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #333; margin-top: 0;">💬 Message :</h3>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #9333EA; border-radius: 4px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 8px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            ✨ Ce message a été envoyé depuis votre portfolio<br>
            🕒 ${new Date().toLocaleString('fr-FR', { 
              timeZone: 'Europe/Paris',
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </p>
        </div>
      </div>
    `,
    text: `
Nouveau message depuis votre portfolio

Nom: ${nom} ${prenom}
Email: ${email}
${téléphone ? `Téléphone: ${téléphone}` : ''}
${sujet ? `Sujet: ${sujet}` : ''}

Message:
${message}

Envoyé le ${new Date().toLocaleString('fr-FR')}
    `
  };
  
  contactEmail.sendMail(emailContent, (error, info) => {
    if (error) {
      console.log("❌ Erreur lors de l'envoi:", error);
      res.status(500).json({ 
        code: 500, 
        error: "Erreur lors de l'envoi de l'email",
        details: error.message 
      });
    } else {
      console.log("✅ Email envoyé avec succès:", info.response);
      res.json({ 
        code: 200, 
        status: "Message envoyé avec succès!",
        messageId: info.messageId
      });
    }
  });
});