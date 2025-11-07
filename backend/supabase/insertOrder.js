import { getSupabaseClient } from './client.js';
const supabase = getSupabaseClient();

export async function insertOrder({
  product_name,
  quantity = 1,
  total_price = null,
  status,
  email,
  stripe_session_id,
  shipping_name,
  shipping_address,
}) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        product_name,
        quantity,
        total_price,
        status,
        email,
        stripe_session_id,
        shipping_name,
        shipping_address,
      },
    ]);

  if (error) console.error('❌ Supabase insert error:', error.message);
  return data;
}