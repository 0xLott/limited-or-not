## Basic guidelines for designing UI

### **1. Contrast & Readability**  

Proper contrast ensures that text, images, and interactive elements are easy to see and understand.  

**Use sufficient color contrast:**  

- Text should have a **contrast ratio of at least 4.5:1** (WCAG AA) for body text and 3:1 for large text.  
- UI components and graphical elements should have **at least 3:1 contrast** against their backgrounds.  
- Tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) help verify contrast levels.  

**Avoid pure black on white:**  

- Instead, use **dark gray (#222, #333)** on white backgrounds to reduce eye strain.  
- Light gray or off-white backgrounds provide a softer contrast while maintaining readability.  

**Avoid using color alone to convey information:**  

- Use **icons, text labels, or patterns** along with color to differentiate states (e.g., errors should include an icon + descriptive text, not just red color).  

---

### **2. Consistent & Minimal Color Variation**  

Too many colors create visual clutter, while too few can make the design monotonous.  

**Define a primary color palette:**  

- **Primary (1-2 colors):** Used for branding and key actions (e.g., buttons, links).  
- **Secondary (1-2 colors):** Used for highlights or additional accents.  
- **Neutrals (Grayscale or muted colors):** Used for backgrounds, text, and dividers.  

**Use color consistently for actions:**  

- Keep **CTA buttons the same color** across the site.  
- **Links should always look like links** (blue is a common convention).  

**Use color psychology strategically:**  

---

### **3. Typography & Text Legibility**  

Typography plays a crucial role in readability and aesthetic balance.  

**Use a clear, web-friendly font:**  

- Sans-serif fonts (e.g., **Inter, Roboto, Lato, Poppins**) work well for digital interfaces.  
- Avoid decorative fonts except for special cases (e.g., branding elements).  

**Font size guidelines:**  

- **Body text:** At least **16px** for readability.  
- **Headings:** Use a clear hierarchy (e.g., H1: 32px, H2: 24px, H3: 20px).  
- **Line height:** **1.5x – 1.75x** the font size for comfortable reading.  

**Avoid all caps for long text blocks** (harder to read).  
**Left-align text** (especially for paragraphs) to improve readability.  

---

### **4. Spacing, Layout & Visual Hierarchy**  

White space and layout organization help users process information easily.  

**Use ample white space:**  

- Avoid cramming elements together; provide breathing room.  
- Keep at least **8px of spacing between elements** (padding/margins).  

**Follow a visual hierarchy:**  

- Larger, bolder elements should stand out as primary actions.  
- Use contrast (color, size, weight) to guide users through the page.  

**Grid-based layouts ensure consistency:**  

- Use **4px, 8px, or 12px spacing increments** for a clean design.  
- Common layout structures: **12-column grids**, **card-based UI**, and **flexbox/grid CSS approaches**.  

---

### **5. UI Components & Interactive Elements**  

Interactive elements should be intuitive and accessible.  

**Buttons & Links:**  

- Maintain **consistent styles** (primary buttons should look different from secondary).  
- Make them large enough for easy clicking (**44x44px minimum for touch targets**).  

**Forms & Inputs:**  

- Provide **visible labels** (not just placeholders).  
- Use **error messages** that explain what’s wrong instead of just showing a red outline.  

**Hover & Focus States:**  

- Ensure **clear visual feedback** (e.g., buttons should change color when hovered or focused).  

---

### **6. Accessibility Considerations (WCAG Compliance)**  

- **Keyboard Navigation:** All elements should be navigable using the **Tab key**.  
- **Screen Reader Support:** Use **ARIA labels** where necessary.  
- **Captions & Alt Text:** All images should have **descriptive alt text** for visually impaired users.  
