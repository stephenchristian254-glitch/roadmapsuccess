// Import library OpenAI
const OpenAI = require('openai');

// Inisialisasi dengan API Key Anda
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Fungsi utama yang akan dipanggil
exports.handler = async function(event, context) {
    // Hanya izinkan metode POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { goal } = JSON.parse(event.body);

        // Prompt engineering: Inilah perintah Anda ke AI
        const prompt = `
            Anda adalah seorang perencana strategis kelas dunia bernama Catalyst.
            Seorang pengguna memberikan Anda sebuah tujuan besar. Tugas Anda adalah memecahnya menjadi sebuah roadmap yang jelas, actionable, dan memotivasi dalam format HTML.

            Struktur output harus seperti ini:
            - Gunakan <h3> untuk judul setiap fase.
            - Gunakan <ul> dan <li> untuk daftar langkah-langkah di setiap fase.
            - Buat langkah pertama sesederhana dan semudah mungkin untuk dikerjakan agar pengguna bisa langsung bertindak.
            - Jaga agar bahasa tetap ringkas, kuat, dan to-the-point.

            Tujuan Pengguna: "${goal}"

            Sekarang, hasilkan roadmapnya dalam format HTML.
        `;
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        // Kirim hasil dari AI kembali ke frontend
        return {
            statusCode: 200,
            body: JSON.stringify({ roadmap: response.choices[0].message.content }),
        };

    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Gagal memproses permintaan.' }),
        };
    }
};