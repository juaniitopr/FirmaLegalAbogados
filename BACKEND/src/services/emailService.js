import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordEmail = async (to, password, userName, resetPasswordUrl) => {
  const mailOptions = {
    from: `"Firma Legal Abogados" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Bienvenido a Firma Legal Abogados - Acceso a tu cuenta',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://tu-dominio.com/logo-firma-legal.png" alt="Firma Legal Abogados" style="max-width: 150px;">
        </div>

        <h2 style="color: #0052cc;">Hola ${userName || 'Cliente'},</h2>
        <p>Tu cuenta en <strong>Firma Legal Abogados</strong> ha sido creada exitosamente.</p>

        <p>Esta es tu contraseña:</p>
        <p style="font-size: 18px; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">${password}</p>

        <p><strong>Por favor, ingresa al sistema usando la contraseña anterior</strong></p>

        ${resetPasswordUrl ? `
          <p style="text-align: center;">
            <a href="${resetPasswordUrl}" style="background-color: #0052cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Cambiar contraseña ahora</a>
          </p>
        ` : ''}

        <hr style="margin: 30px 0;">

        <p>Si tienes alguna duda o necesitas ayuda, contáctanos:</p>
        <ul>
          <li>Email: <a href="mailto:soporte@firmalegalabogados.com">soporte@firmalegalabogados.com</a></li>
          <li>Teléfono: +57 123 456 7890</li>
          <li><a href="https://www.firmalegalabogados.com" target="_blank">www.firmalegalabogados.com</a></li>
        </ul>

        <p>Saludos cordiales,<br><strong>Equipo Firma Legal Abogados</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
