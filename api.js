// Konfigurasi Supabase
const SUPABASE_URL = 'https://puvbbhhrmhhxevaitbpc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0xuKwAB1KfAM8b4mONQQXg_CbaubMeN';

// Inisialisasi client
// PERBAIKAN: sebelumnya "const supabase = supabase.createClient(...)" menimpa
// objek global "supabase" yang disediakan oleh CDN (supabase-js) dengan variabel
// lokal bernama sama. Karena const kena hoisting (temporal dead zone), baris ini
// selalu gagal dengan "ReferenceError: Cannot access 'supabase' before initialization"
// sehingga seluruh file api.js berhenti dieksekusi. Sekarang diberi nama beda.
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fungsi untuk mengambil data dari tabel tertentu
async function getSupabaseData(tableName) {
  const { data, error } = await supabaseClient
    .from(tableName)
    .select('*');
  
  if (error) {
    console.error("Error fetching from Supabase:", error);
    return null;
  }
  return data;
}

// Fungsi untuk menambah data
async function insertSupabaseData(tableName, rowData) {
  const { data, error } = await supabaseClient
    .from(tableName)
    .insert([rowData]);
    
  if (error) {
    console.error("Error inserting to Supabase:", error);
    return null;
  }
  return data;
}
