/** Store copy for the home-page sections. Reviews are samples for the demo. */
export const FEATURES = [
  { icon: 'footprints', title: 'Comfort tested', text: 'Every pair is worn and walked in before it reaches the shop.' },
  { icon: 'wallet', title: 'Cash on delivery', text: 'Pay when your order arrives — no card needed.' },
  { icon: 'rotate', title: '7-day exchange', text: 'Wrong size? Exchange it within 7 days, free.' },
  { icon: 'truck', title: 'Fast delivery', text: '1–2 days inside Dhaka, 3–5 days across Bangladesh.' },
] as const;

export const REVIEWS = [
  { name: 'Rafi A.', city: 'Dhaka', rating: 5, product: 'Glide Knit Runner', text: 'Very light and comfortable. I walk to the office every day and my feet don’t hurt anymore.' },
  { name: 'Nusrat J.', city: 'Chattogram', rating: 5, product: 'Classic Straight Jeans', text: 'The fit is perfect and the fabric is soft. Delivery came in three days.' },
  { name: 'Tanvir H.', city: 'Sylhet', rating: 4, product: 'Aero Mesh Trainer', text: 'Good grip for the gym. Size runs true — I ordered my usual 42.' },
] as const;

export const SHOE_SIZE_GUIDE = [
  ['39', '24.5'],
  ['40', '25.0'],
  ['41', '25.5'],
  ['42', '26.5'],
  ['43', '27.0'],
  ['44', '28.0'],
] as const;

export const JEAN_SIZE_GUIDE = [
  ['30', '76'],
  ['32', '81'],
  ['34', '86'],
  ['36', '91'],
  ['38', '97'],
] as const;

export const FAQS = [
  { q: 'How do I pay?', a: 'Cash on delivery. You pay the delivery person when your order arrives.' },
  { q: 'How long does delivery take?', a: 'Inside Dhaka 1–2 days (৳70). Outside Dhaka 3–5 days (৳130).' },
  { q: 'Can I exchange a size?', a: 'Yes. Unworn items can be exchanged within 7 days. Keep the box and tag.' },
  { q: 'How do I find my shoe size?', a: 'Measure your foot from heel to longest toe in centimetres and match it in the size guide above.' },
  { q: 'Is this a real shop?', a: 'No — Zorvyn is a demo store. Orders and newsletter sign-ups are not sent anywhere and no payment is taken.' },
] as const;
