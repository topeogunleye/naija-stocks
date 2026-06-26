// 1. Initialize the Live Ticker
const stocks = [
  { sym: 'DANGCEM', price: '₦756.10', chg: '+2.14%', up: true },
  { sym: 'MTNN', price: '₦220.40', chg: '+0.91%', up: true },
  { sym: 'ZENITHBANK', price: '₦38.75', chg: '-0.64%', up: false },
  { sym: 'GTCO', price: '₦47.20', chg: '+1.73%', up: true },
  { sym: 'AIRTELAFRI', price: '₦2,340.00', chg: '+3.02%', up: true },
  { sym: 'NESTLE', price: '₦1,580.00', chg: '-0.19%', up: false },
  { sym: 'SEPLAT', price: '₦4,200.00', chg: '+1.45%', up: true },
  { sym: 'UBA', price: '₦24.55', chg: '+0.82%', up: true },
  { sym: 'BUACEMENT', price: '₦102.50', chg: '-1.02%', up: false },
  { sym: 'ACCESSCORP', price: '₦19.30', chg: '+0.52%', up: true },
  { sym: 'FIDELITYBK', price: '₦14.70', chg: '+0.34%', up: true },
  { sym: 'TRANSCORP', price: '₦8.90', chg: '-0.44%', up: false },
];

function buildTicker() {
  const track = document.getElementById('ticker');
  const doubled = [...stocks, ...stocks];
  track.innerHTML = doubled
    .map(
      (s) => `
          <div class="ticker-item">
            <span class="ticker-sym">${s.sym}</span>
            <span class="ticker-price">${s.price}</span>
            <span class="${s.up ? 'ticker-up' : 'ticker-down'}">${s.chg}</span>
          </div>
        `,
    )
    .join('');
}

// 2. Form Submission to Supabase
async function handleSubmit() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const country = document.getElementById('country').value;
  const invest = document.getElementById('invest').value;
  const submitBtn = document.querySelector('button[onclick="handleSubmit()"]');

  // Validation Checks
  if (!name || !email || !country) {
    alert('Please fill in your name, email, and country to continue.');
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Visual Loading State
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Joining...';
  }

  // Insert your raw string credentials here directly
  const SUPABASE_URL = 'https://your-project-id.supabase.co';
  const SUPABASE_ANON_KEY = 'your-actual-anon-public-key-string';

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        country: country,
        estimated_investment: invest, // Added to capture your fourth input field!
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to join the waitlist. Please try again.');
    }

    // Update UI to Success State
    document.getElementById('form-state').style.display = 'none';
    document.getElementById('success-state').style.display = 'block';
  } catch (error) {
    alert(error.message);

    // Reset button if it fails
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Request early access →';
    }
  }
}

// Run on load
buildTicker();
