// Supabase Client Integration for Pizzaria Arte & Delícia
// URL: https://wnyglprzohwuqrkbdgff.supabase.co

const SUPABASE_CONFIG = {
  url: "https://wnyglprzohwuqrkbdgff.supabase.co",
  anonKey: "sb_publishable_Oo50PAkXhtKDKJ2is_aX4Q_U24T5DHm"
};

let supabaseClient = null;

function initSupabase() {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log('✅ Supabase Conectado com Sucesso!');
    } catch (err) {
      console.warn('Erro ao inicializar Supabase:', err);
    }
  }
}

// Salvar/Atualizar perfil do cliente na tabela 'clientes'
async function syncProfileWithSupabase(profile) {
  if (!supabaseClient || !profile || !profile.phone) return null;

  try {
    const payload = {
      phone: profile.phone.replace(/\D/g, ''),
      name: profile.name,
      street: profile.street,
      neighborhood: profile.neighborhood,
      complement: profile.complement || '',
      payment_pref: profile.paymentPref || 'Pix',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseClient
      .from('clientes')
      .upsert(payload, { onConflict: 'phone' })
      .select();

    if (error) {
      console.warn('Aviso ao sincronizar perfil com Supabase:', error.message);
      return null;
    }

    console.log('✅ Perfil sincronizado no Supabase:', data);
    return data;
  } catch (e) {
    console.warn('Erro na comunicação com Supabase:', e);
    return null;
  }
}

// Buscar perfil do cliente pelo telefone
async function getProfileFromSupabase(phone) {
  if (!supabaseClient || !phone) return null;

  try {
    const cleanPhone = phone.replace(/\D/g, '');
    const { data, error } = await supabaseClient
      .from('clientes')
      .select('*')
      .eq('phone', cleanPhone)
      .maybeSingle();

    if (error) {
      console.warn('Aviso ao buscar cliente no Supabase:', error.message);
      return null;
    }

    if (data) {
      return {
        name: data.name,
        phone: data.phone,
        street: data.street,
        neighborhood: data.neighborhood,
        complement: data.complement || '',
        paymentPref: data.payment_pref || 'Pix'
      };
    }
    return null;
  } catch (e) {
    console.warn('Erro ao consultar cliente no Supabase:', e);
    return null;
  }
}

// Registrar pedido na tabela 'pedidos' do Supabase
async function logOrderToSupabase(orderRecord) {
  if (!supabaseClient || !orderRecord) return null;

  try {
    const { data, error } = await supabaseClient
      .from('pedidos')
      .insert([{
        customer_name: orderRecord.customerName,
        customer_phone: orderRecord.customerPhone?.replace(/\D/g, ''),
        order_type: orderRecord.orderType,
        delivery_address: orderRecord.deliveryAddress,
        items: orderRecord.items,
        total_amount: orderRecord.totalAmount,
        payment_method: orderRecord.paymentMethod,
        notes: orderRecord.notes || '',
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.warn('Aviso ao registrar pedido no Supabase:', error.message);
      return null;
    }

    console.log('✅ Pedido registrado no Supabase:', data);
    return data;
  } catch (e) {
    console.warn('Erro ao salvar pedido no Supabase:', e);
    return null;
  }
}

// Inicializar quando o SDK carregar
document.addEventListener('DOMContentLoaded', initSupabase);

// Exportações globais para uso no app.js
window.supabaseClient = supabaseClient;
window.syncProfileWithSupabase = syncProfileWithSupabase;
window.getProfileFromSupabase = getProfileFromSupabase;
window.logOrderToSupabase = logOrderToSupabase;
