-- =========================================================================
-- SQL SCHEMA FOR SUPABASE - PIZZARIA ARTE & DELÍCIA
-- Cole este script no SQL Editor do Supabase para criar as tabelas
-- =========================================================================

-- 1. TABELA DE CLIENTES (Para salvar perfis e endereços de entrega)
CREATE TABLE IF NOT EXISTS public.clientes (
    id BIGSERIAL PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    street TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    complement TEXT,
    payment_pref TEXT DEFAULT 'Pix',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS e criar políticas de leitura e inserção pública (chave anon)
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura anonima de clientes" 
ON public.clientes FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Permitir upsert anonimo de clientes" 
ON public.clientes FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Permitir update anonimo de clientes" 
ON public.clientes FOR UPDATE 
TO anon, authenticated 
USING (true);

-- 2. TABELA DE PEDIDOS (Para registrar histórico de pedidos)
CREATE TABLE IF NOT EXISTS public.pedidos (
    id BIGSERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    order_type TEXT NOT NULL,
    delivery_address TEXT,
    items JSONB NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir criacao de pedidos anonimos" 
ON public.pedidos FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Permitir leitura de pedidos autenticados" 
ON public.pedidos FOR SELECT 
TO anon, authenticated 
USING (true);
