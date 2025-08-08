# AI E-commerce Product Catalog

This project is a small e-commerce product catalog app built with Next.js 15 and Tailwind CSS. It integrates a Smart Product Search (NLP) feature to enhance user interaction and decision-making.

## How to Run the App

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-link>
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or yarn install
    # or pnpm install
    \`\`\`
3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    \`\`\`
4.  **Open in your browser:**
    Navigate to \`http://localhost:3000\`

No environment variables are required.

## Which AI Feature Was Chosen?

**🧠 Option A – Smart Product Search (NLP)**

This application implements a natural language search across the product catalog. Users can type queries like "Show me running shoes under $100 with good reviews," and the system will parse the intent to filter products accordingly.

## Tools/Libraries Used

- **Next.js 15 (App Router):** For server-side rendering, routing, and API routes.
- **React (Server and Client Components):** To build the user interface.
- **Tailwind CSS:** For utility-first styling and responsive design.
- **No external UI libraries:** All components are custom-styled with Tailwind CSS.
- **No external AI APIs (e.g., OpenAI):** The NLP feature is implemented with a lightweight, on-device parser using regular expressions and a simple synonym dictionary. This means no API keys or external services are required to run the AI search.

## Notable Assumptions

- **"Good reviews" / "High rating":** Interpreted as a minimum rating of 4.0 stars.
- **"Top rated" / "Best reviews":** Interpreted as a minimum rating of 4.5 stars.
- **Price Interpretation:** If a single dollar amount is present without an explicit operator (e.g., "shoes $50"), it is generally interpreted as a maximum price. Phrases like "under $X" or "over $X" are handled explicitly.
- **Category Detection:** Relies on a predefined synonym map within \`lib/nlp.ts\` to match keywords to canonical product categories.
- **Keyword Relevance:** Uses simple substring matching on product name, description, and category. A small rating boost is applied implicitly by the filtering order.
- **Filtering Logic:** Hard filters (category, price range, minimum rating) derived from the NLP query are applied first. If the NLP query is insufficient, or if the "Classic Filters" tab is active, the classic filter values are used.

## Error Handling and User Experience (UX)

- **Free-form Input:** The AI search input is free-form. If no specific filters (category, price, rating) are detected, the system falls back to keyword-based relevance.
- **Reset Buttons:** Dedicated reset buttons are provided for both the AI Search and Classic Filters tabs to clear inputs.
- **AI Understanding Panel:** When using AI Search, a dynamic "AI Understanding" panel displays the parsed intent (e.g., detected category, price range, minimum rating, keywords), providing transparency to the user.
- **Result Count:** The number of products matching the current filters is always displayed.
- **Responsive Design:** The layout is designed to be responsive and adapt to various screen sizes using Tailwind CSS.
- **No Results Message:** A clear message is displayed if no products match the applied filters.

## How the AI/NLP Feature Works

The \`lib/nlp.ts\` file contains the core logic for the Smart Product Search:

1.  **Tokenization:** The input query is converted to lowercase and undergoes simple normalization.
2.  **Rule Extraction:**
    - **Price:** Regular expressions are used to detect patterns like "under $X", "over $X", "between X and Y", and standalone dollar amounts.
    - **Rating:** Keywords like "good reviews", "top rated", and numerical "X stars" are identified to set a minimum rating threshold.
    - **Categories:** A predefined \`categorySynonyms\` map is used to match keywords in the query (e.g., "sneakers") to canonical categories (e.g., "Footwear").
3.  **Filtering and Ranking:**
    - The \`filterProducts\` function first applies the hard filters (category, price, rating) extracted by the NLP parser.
    - If keywords remain, a secondary pass filters products whose name, description, or category contain any of the extracted keywords.
    - The system prioritizes NLP-derived filters, then applies classic filter values if they are more specific or if the classic tab is active.
