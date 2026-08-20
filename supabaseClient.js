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

// =========================================================================
// GOOGLE OAUTH AUTHENTICATION VIA SUPABASE
// =========================================================================

async function loginWithGoogle() {
  if (!supabaseClient) {
    initSupabase();
  }
  if (!supabaseClient) {
    alert('Conexão com o Supabase indisponível no momento.');
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });

    if (error) {
      console.warn('Supabase Auth Info:', error);
      if (error.message && error.message.includes('not enabled')) {
        alert('⚠️ O provedor Google ainda não foi ativado no painel do Supabase.\n\nPara ativar: acesse seu painel do Supabase -> Authentication -> Providers -> Ative o "Google".\n\nEnquanto isso, você pode preencher seus dados diretamente no formulário abaixo!');
      } else {
        alert('Aviso do Google Login: ' + error.message);
      }
    }
  } catch (err) {
    console.error('Falha ao autenticar com o Google:', err);
  }
}

async function signOutGoogle() {
  if (supabaseClient) {
    try {
      await supabaseClient.auth.signOut();
    } catch (e) {}
  }
  localStorage.removeItem('arte_delicia_google_user');
  updateGoogleUI(null);
  if (typeof updateUserNavBadge === 'function') updateUserNavBadge();
  alert('Você saiu da sua conta Google.');
}

async function checkSupabaseAuthSession() {
  if (!supabaseClient) initSupabase();
  if (!supabaseClient) return;

  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && session.user) {
      handleGoogleUserAuthenticated(session.user);
    } else {
      const cachedGoogle = localStorage.getItem('arte_delicia_google_user');
      if (cachedGoogle) {
        try {
          updateGoogleUI(JSON.parse(cachedGoogle));
        } catch (e) {}
      }
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        handleGoogleUserAuthenticated(session.user);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('arte_delicia_google_user');
        updateGoogleUI(null);
        if (typeof updateUserNavBadge === 'function') updateUserNavBadge();
      }
    });
  } catch (e) {
    console.warn('Erro ao verificar sessão Supabase:', e);
  }
}

function handleGoogleUserAuthenticated(user) {
  const meta = user.user_metadata || {};
  const googleData = {
    id: user.id,
    name: meta.full_name || meta.name || user.email?.split('@')[0] || 'Cliente',
    email: user.email,
    avatar: meta.avatar_url || meta.picture || ''
  };

  localStorage.setItem('arte_delicia_google_user', JSON.stringify(googleData));
  
  // Se o cliente não tiver nome preenchido no perfil local, preencher com o nome do Google
  try {
    const saved = localStorage.getItem('arte_delicia_user');
    const savedProfile = saved ? JSON.parse(saved) : {};
    if (!savedProfile.name) {
      savedProfile.name = googleData.name;
      localStorage.setItem('arte_delicia_user', JSON.stringify(savedProfile));
    }
  } catch (e) {}

  updateGoogleUI(googleData);
  if (typeof updateUserNavBadge === 'function') updateUserNavBadge();
}

function updateGoogleUI(googleData) {
  const authSection = document.getElementById('googleAuthSection');
  const loggedCard = document.getElementById('googleLoggedInCard');
  const userAvatar = document.getElementById('googleUserAvatar');
  const userName = document.getElementById('googleUserName');
  const userEmail = document.getElementById('googleUserEmail');

  if (googleData) {
    if (authSection) authSection.style.display = 'none';
    if (loggedCard) loggedCard.style.display = 'flex';
    if (userAvatar) {
      userAvatar.src = googleData.avatar || 'assets/hero.jpg';
    }
    if (userName) userName.innerText = googleData.name;
    if (userEmail) userEmail.innerText = googleData.email;

    // Preencher campo de nome se estiver vazio
    const nameInput = document.getElementById('profileName');
    if (nameInput && !nameInput.value) {
      nameInput.value = googleData.name;
    }
  } else {
    if (authSection) authSection.style.display = 'block';
    if (loggedCard) loggedCard.style.display = 'none';
  }
}

// Inicializar quando o SDK carregar
document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  setTimeout(checkSupabaseAuthSession, 300);
});

// Exportações globais para uso no app.js
window.supabaseClient = supabaseClient;
window.syncProfileWithSupabase = syncProfileWithSupabase;
window.getProfileFromSupabase = getProfileFromSupabase;
window.logOrderToSupabase = logOrderToSupabase;
window.loginWithGoogle = loginWithGoogle;
window.signOutGoogle = signOutGoogle;
window.checkSupabaseAuthSession = checkSupabaseAuthSession;
window.updateGoogleUI = updateGoogleUI;

