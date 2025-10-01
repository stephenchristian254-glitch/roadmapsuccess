// Kode Mesin Tiruan (Mock API)
// Tidak memerlukan library Google atau API Key

exports.handler = async function(event, context) {
    // Kita tetap cek metodenya untuk praktik yang baik
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // Ini adalah contoh roadmap statis yang kita siapkan
    const dummyRoadmap = `
        <h3>Fase 1: Validasi Ide (Minggu 1)</h3>
        <ul>
            <li>Langkah 1.1: Tentukan target audiens spesifik untuk ide Anda.</li>
            <li>Langkah 1.2: Buat survei sederhana dengan Google Forms untuk menguji minat pasar.</li>
            <li>Langkah 1.3: Hubungi 5 calon pengguna potensial untuk wawancara singkat.</li>
        </ul>
        <h3>Fase 2: Prototipe Awal (Minggu 2-3)</h3>
        <ul>
            <li>Langkah 2.1: Buat landing page sederhana yang menjelaskan produk Anda.</li>
            <li>Langkah 2.2: Kembangkan fitur inti paling minimal dari produk.</li>
        </ul>
        <p class="mt-4 text-yellow-400"><i>Catatan: Ini adalah contoh roadmap. Selesaikan masalah billing Anda untuk mendapatkan hasil dinamis dari AI Gemini.</i></p>
    `;

    // Kita langsung kirimkan contoh roadmap ini sebagai jawaban
    return {
        statusCode: 200,
        body: JSON.stringify({ roadmap: dummyRoadmap }),
    };
};