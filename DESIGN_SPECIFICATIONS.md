# Adventure Aviator 007: Design Specifications

## 🎨 Visual Design System

### Color Palette

#### Primary Colors:
- **Mission Blue:** `#0077B6`
  - Usage: Primary buttons, headers, important elements
  - RGB: 0, 119, 182
  - HSL: 202°, 100%, 36%

- **Dark Blue:** `#005885`
  - Usage: Secondary elements, hover states
  - RGB: 0, 88, 133
  - HSL: 202°, 100%, 26%

- **Light Blue:** `#4DA8DA`
  - Usage: Accents, borders, subtle backgrounds
  - RGB: 77, 168, 218
  - HSL: 202°, 65%, 58%

#### Neutral Colors:
- **White:** `#FFFFFF`
  - Usage: Backgrounds, text on dark backgrounds
  - RGB: 255, 255, 255

- **Off-White:** `#F8F9FA`
  - Usage: Card backgrounds, subtle contrasts
  - RGB: 248, 249, 250
  - HSL: 210°, 33%, 98%

- **Light Gray:** `#E9ECEF`
  - Usage: Borders, dividers, disabled states
  - RGB: 233, 236, 239
  - HSL: 210°, 20%, 93%

- **Medium Gray:** `#6C757D`
  - Usage: Secondary text, icons
  - RGB: 108, 117, 125
  - HSL: 210°, 7%, 46%

- **Dark Gray:** `#343A40`
  - Usage: Body text, important icons
  - RGB: 52, 58, 64
  - HSL: 210°, 10%, 23%

- **Black:** `#212529`
  - Usage: Headings, primary text
  - RGB: 33, 37, 41
  - HSL: 210°, 11%, 15%

#### 007 Theme Accents:
- **Bond Gold:** `#D4AF37`
  - Usage: Premium features, achievements, highlights
  - RGB: 212, 175, 55
  - HSL: 46°, 65%, 52%

- **Bond Red:** `#C41E3A`
  - Usage: Errors, warnings, critical alerts
  - RGB: 196, 30, 58
  - HSL: 350°, 73%, 44%

- **Bond Green:** `#228B22`
  - Usage: Success states, completion, safety
  - RGB: 34, 139, 34
  - HSL: 120°, 61%, 34%

#### Intelligence UI Colors:
- **Intel Background:** `#0A1929`
  - Usage: Dark mode backgrounds, special sections
  - RGB: 10, 25, 41
  - HSL: 210°, 61%, 10%

- **Intel Card:** `#112240`
  - Usage: Cards in dark mode
  - RGB: 17, 34, 64
  - HSL: 220°, 58%, 16%

- **Intel Border:** `#233554`
  - Usage: Borders in dark mode
  - RGB: 35, 53, 84
  - HSL: 220°, 41%, 23%

- **Intel Text:** `#CCD6F6`
  - Usage: Text in dark mode
  - RGB: 204, 214, 246
  - HSL: 227°, 70%, 88%

- **Intel Highlight:** `#64FFDA`
  - Usage: Highlights, accents in dark mode
  - RGB: 100, 255, 218
  - HSL: 168°, 100%, 70%

### Typography

#### Font Families:
- **Primary Heading:** `Orbitron`
  - Weights: 400 (Regular), 700 (Bold), 900 (Black)
  - Usage: All headings, navigation, important labels
  - Characteristics: Geometric, tech-inspired, mission-focused

- **Secondary Heading:** `Roboto`
  - Weights: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
  - Usage: Subheadings, card titles, button text
  - Characteristics: Modern, clean, highly readable

- **Body Text:** `Roboto`
  - Weights: 300 (Light), 400 (Regular)
  - Usage: Paragraphs, descriptions, explanations
  - Characteristics: Excellent readability, neutral tone

- **Code/Technical:** `JetBrains Mono`
  - Weights: 400 (Regular), 700 (Bold)
  - Usage: Code snippets, technical references, data displays
  - Characteristics: Clear character distinction, programming optimized

#### Font Sizes (Desktop):
- **H1:** 3rem (48px) - Orbitron 900
- **H2:** 2.25rem (36px) - Orbitron 700
- **H3:** 1.75rem (28px) - Orbitron 700
- **H4:** 1.5rem (24px) - Roboto 700
- **H5:** 1.25rem (20px) - Roboto 700
- **H6:** 1rem (16px) - Roboto 700
- **Body Large:** 1.125rem (18px) - Roboto 400
- **Body Regular:** 1rem (16px) - Roboto 400
- **Body Small:** 0.875rem (14px) - Roboto 400
- **Caption:** 0.75rem (12px) - Roboto 400

#### Font Sizes (Mobile):
- **H1:** 2rem (32px) - Orbitron 900
- **H2:** 1.75rem (28px) - Orbitron 700
- **H3:** 1.5rem (24px) - Orbitron 700
- **H4:** 1.25rem (20px) - Roboto 700
- **H5:** 1.125rem (18px) - Roboto 700
- **H6:** 1rem (16px) - Roboto 700
- **Body Large:** 1rem (16px) - Roboto 400
- **Body Regular:** 0.875rem (14px) - Roboto 400
- **Body Small:** 0.75rem (12px) - Roboto 400
- **Caption:** 0.6875rem (11px) - Roboto 400

### Spacing System

#### Base Unit: 8px
All spacing multiples of 8px for consistency and rhythm.

#### Spacing Scale:
- **XS:** 4px (0.5 × base)
- **S:** 8px (1 × base)
- **M:** 16px (2 × base)
- **L:** 24px (3 × base)
- **XL:** 32px (4 × base)
- **2XL:** 48px (6 × base)
- **3XL:** 64px (8 × base)
- **4XL:** 96px (12 × base)

#### Container Widths:
- **Extra Small:** 100% (mobile)
- **Small:** 540px
- **Medium:** 720px
- **Large:** 960px
- **Extra Large:** 1140px
- **Full:** 1400px (max-width for content)

### Component Design

#### Buttons:
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #0077B6 0%, #005885 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 119, 182, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #0077B6;
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid #0077B6;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(0, 119, 182, 0.1);
  transform: translateY(-2px);
}
```

#### Cards:
```css
/* Standard Card */
.card {
  background: white;
  border-radius: 12px;
  border: 2px solid #4DA8DA;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-color: #0077B6;
}

/* Mission Card (Special) */
.card-mission {
  background: linear-gradient(135deg, #0077B6 0%, #005885 100%);
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
}

.card-mission::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.card-mission:hover::before {
  transform: translateX(100%);
}
```

#### Navigation:
```css
/* Main Navigation */
.nav-main {
  background: white;
  border-bottom: 3px solid #0077B6;
  padding: 16px 0;
}

.nav-link {
  color: #6C757D;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #0077B6;
  background: rgba(0, 119, 182, 0.1);
}

.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #0077B6 0%, #005885 100%);
  box-shadow: 0 4px 15px rgba(0, 119, 182, 0.2);
}
```

#### Forms:
```css
/* Input Fields */
.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E9ECEF;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #0077B6;
  box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
}

/* Select Dropdowns */
.select-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E9ECEF;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-field:focus {
  outline: none;
  border-color: #0077B6;
  box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
}
```

### Animation System

#### Duration Scale:
- **Fast:** 150ms (micro-interactions)
- **Medium:** 300ms (standard transitions)
- **Slow:** 500ms (page transitions, major changes)
- **Very Slow:** 1000ms (background animations, special effects)

#### Easing Functions:
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)`
- **Decelerate:** `cubic-bezier(0, 0, 0.2, 1)`
- **Accelerate:** `cubic-bezier(0.4, 0, 1, 1)`
- **Sharp:** `cubic-bezier(0.4, 0, 0.6, 1)`

#### Animation Types:
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease;
}

/* Slide In (From Bottom) */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slideInUp 0.5s ease;
}

/* Pulse (For Attention) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pulse {
  animation: pulse 2s infinite;
}

/* Loading Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### Iconography

#### Icon Set: Font Awesome 6
- **Style:** Solid (fas) for primary, Regular (far) for secondary
- **Size Scale:** 16px, 20px, 24px, 32px, 48px
- **Color Usage:** Follows color palette hierarchy

#### Custom Icons (If needed):
- **Format:** SVG with currentColor for theme support
- **Size:** 24×24px base size
- **Stroke:** 2px for consistency
- **Corners:** Rounded (2px radius) for soft tech feel

### Layout Grid

#### Desktop (≥ 1200px):
- **Columns:** 12
- **Gutter:** 24px
- **Margin:** 32px
- **Max Width:** 1400px

#### Tablet (768px - 1199px):
- **Columns:** 8
- **Gutter:** 20px
- **Margin:** 24px
- **Max Width:** 100%

#### Mobile (≤ 767px):
- **Columns:** 4
- **Gutter:** 16px
- **Margin:** 16px
- **Max Width:** 100%

### Responsive Breakpoints

```css
/* Mobile First Approach */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { /* ... */ }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { /* ... */ }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { /* ... */ }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { /* ... */ }

/* Extra extra large devices (1400px and up) */
@media (min-width: 1400px) { /* ... */ }
```

### Accessibility Standards

#### WCAG 2.1 AA Compliance:
- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators:** Clear visible focus states
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader Support:** ARIA labels, semantic HTML
- **Text Resizing:** Support up to 200% without loss of functionality

#### Accessibility Features:
- **Skip Links:** For keyboard users to skip navigation
- **Alt Text:** For all informative images
- **Form Labels:** Clear, associated labels for all form elements
- **Error Identification:** Clear error messages and suggestions
- **Time-based Media:** Alternatives for time-based content

### Performance Targets

#### Loading Performance:
- **First Contentful Paint:** < 1.5 seconds
- **Largest Contentful Paint:** < 2.5 seconds
- **Time to Interactive:** < 3.5 seconds
- **Total Blocking Time:** < 200ms
- **Cumulative Layout Shift:** < 0.1

#### Asset Optimization:
- **Images:** WebP format with fallbacks, responsive srcset
- **Fonts:** WOFF2 format, subset when possible
- **JavaScript:** Code splitting, lazy loading
- **CSS:** Critical CSS inlined, rest deferred

### Browser Support

#### Tier 1 (Full Support):
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

#### Tier 2 (Progressive Enhancement):
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)
- Samsung Internet (last 2 versions)

#### Tier 3 (Basic Support):
- IE 11 (limited functionality)
- Older browsers (graceful degradation)

### Design Tokens

#### CSS Custom Properties:
```css
:root {
  /* Colors */
  --color-primary: #0077B6;
  --color-primary-dark: #005885;
  --color-primary-light: #4DA8DA;
  
