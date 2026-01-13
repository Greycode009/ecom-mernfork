const products = [
    // Productivity & Cloud Storage
    {
        title: "Zoom Pro Nepal - Best Price",
        slug: "zoom-pro-nepal",
        description: "Get Zoom Pro subscription in Nepal at the best price. Perfect for meetings, webinars, and online collaboration. Manual activation within 1-6 hours.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500"],
        category: "Productivity",
        countInStock: 100,
        tags: ["Productivity", "Video Conferencing"],
        requiredFields: ["email"]
    },
    {
        title: "Buy Google Meet in Nepal",
        slug: "google-meet-nepal",
        description: "Google Meet premium subscription for seamless video conferencing. High-quality video calls, screen sharing, and recording features.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Video Conferencing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy iCloud Storage in Nepal",
        slug: "icloud-storage-nepal",
        description: "Expand your iCloud storage for all your photos, videos, and files. Secure cloud storage from Apple at affordable prices in Nepal.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1544099858-75feeb8ca851?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Cloud Storage"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Microsoft OneDrive - Nepal",
        slug: "microsoft-onedrive-nepal",
        description: "Microsoft OneDrive cloud storage subscription. Store, sync, and share your files securely across all devices.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Cloud Storage"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Google One Plan Nepal",
        slug: "google-one-nepal",
        description: "Google One premium storage plan with additional benefits. More storage for Gmail, Google Photos, and Google Drive.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Cloud Storage"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // AI Tools
    {
        title: "Buy Lovable AI Pro at Best Price",
        slug: "lovable-ai-pro",
        description: "Lovable AI Pro subscription for advanced AI-powered development. Build applications faster with intelligent code generation.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500"],
        category: "AI",
    tags: ["AI", "Development"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Bolt AI: Smarter AI Writing Tool",
        slug: "bolt-ai-writing",
        description: "Bolt AI premium subscription for smarter writing. AI-powered content creation, editing, and optimization tool.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=500"],
        category: "AI",
    tags: ["AI", "Writing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Midjourney AI in Nepal at Best Prices",
        slug: "midjourney-ai-nepal",
        description: "Midjourney AI subscription for stunning image generation. Create professional artwork and designs with AI.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1686191128892-c131c35ba3c6?w=500"],
        category: "AI",
    tags: ["AI", "Design"],
        countInStock: 100,
        requiredFields: ["email", "username"]
    
  },
    {
        title: "Buy Originality AI in Nepal - Best Price",
        slug: "originality-ai-nepal",
        description: "Originality AI subscription for content authenticity checking. Detect AI-generated content and plagiarism.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"],
        category: "AI",
    tags: ["AI", "Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Semrush Nepal - Buy Subscription at Low Cost",
        slug: "semrush-nepal",
        description: "Semrush premium subscription for SEO and digital marketing. Comprehensive tools for keyword research, competitor analysis.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"],
        category: "AI",
    tags: ["AI", "Marketing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy ElevenLabs Now in Nepal",
        slug: "elevenlabs-nepal",
        description: "ElevenLabs AI voice generation subscription. Create realistic voiceovers and speech synthesis with advanced AI.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500"],
        category: "AI",
    tags: ["AI", "Audio"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Claude AI in Nepal - Best Price & Fast Delivery",
        slug: "claude-ai-nepal",
        description: "Claude AI subscription by Anthropic. Advanced conversational AI assistant for writing, analysis, and problem-solving.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500"],
        category: "AI",
    tags: ["AI", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Stealthwriter AI Now in Nepal - Buy Today!",
        slug: "stealthwriter-ai-nepal",
        description: "Stealthwriter AI subscription for undetectable AI content. Transform AI-generated text to human-like writing.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500"],
        category: "AI",
    tags: ["AI", "Writing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Google AI Ultra Online Nepal",
        slug: "google-ai-ultra-nepal",
        description: "Google AI Ultra (Gemini Ultra) subscription. Most advanced AI model from Google for complex tasks.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500"],
        category: "AI",
    tags: ["AI", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Gemini AI Now",
        slug: "gemini-ai-nepal",
        description: "Gemini AI Pro subscription by Google. Multimodal AI assistant for text, code, and image understanding.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500"],
        category: "AI",
    tags: ["AI", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Perplexity AI in Nepal",
        slug: "perplexity-ai-nepal",
        description: "Perplexity AI Pro subscription. AI-powered search and research assistant with real-time information.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500"],
        category: "AI",
    tags: ["AI", "Research"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Hix AI in Nepal Today - Quick & Affordable",
        slug: "hix-ai-nepal",
        description: "Hix AI subscription for all-in-one AI writing. Content generation, editing, and SEO optimization tools.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500"],
        category: "AI",
    tags: ["AI", "Writing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "How to Get ChatGPT Plus in Nepal",
        slug: "chatgpt-plus-nepal",
        description: "ChatGPT Plus subscription by OpenAI. Access to GPT-4, faster response times, and priority access during peak hours.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500"],
        category: "AI",
    tags: ["AI", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Gamma AI in Nepal at Lowest Price",
        slug: "gamma-ai-nepal",
        description: "Gamma AI subscription for AI-powered presentations. Create beautiful slides and documents in minutes.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=500"],
        category: "AI",
    tags: ["AI", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // Academic & Writing Tools
    {
        title: "Buy GPTZero Subscription in Nepal",
        slug: "gptzero-nepal",
        description: "GPTZero subscription for AI detection. Verify content authenticity and detect AI-generated text.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500"],
        category: "AI",
    tags: ["AI", "Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Paperpal Premium in Nepal: The Best Deal",
        slug: "paperpal-premium-nepal",
        description: "Paperpal Premium for academic writing enhancement. AI-powered grammar and language improvement for research papers.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500"],
        category: "Education",
    tags: ["Education", "Writing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Scribd Premium Subscription in Nepal",
        slug: "scribd-premium-nepal",
        description: "Scribd Premium unlimited access to books, audiobooks, magazines, and documents. Digital library subscription.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"],
        category: "Education",
    tags: ["Education", "Entertainment"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Turnitin Premium Subscription in Nepal",
        slug: "turnitin-premium-nepal",
        description: "Turnitin subscription for plagiarism detection. Essential tool for students and educators to ensure academic integrity.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500"],
        category: "Education",
    tags: ["Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Quillbot Premium Subscription in Nepal",
        slug: "quillbot-premium-nepal",
        description: "Quillbot Premium for advanced paraphrasing and writing. AI-powered tool for rewriting, summarizing, and grammar checking.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500"],
        category: "Education",
    tags: ["Education", "Writing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Grammarly Premium: Boost Your Writing",
        slug: "grammarly-premium-nepal",
        description: "Grammarly Premium subscription for perfect writing. Advanced grammar checking, style suggestions, and plagiarism detection.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500"],
        category: "Education",
    tags: ["Education", "Writing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Jenni AI Subscription in Nepal at Best Price",
        slug: "jenni-ai-nepal",
        description: "Jenni AI subscription for academic writing assistance. AI co-pilot for research papers, essays, and literature reviews.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500"],
        category: "AI",
    tags: ["AI", "Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // Design & Creative
    {
        title: "Get CorelDRAW Download License in Nepal",
        slug: "coreldraw-nepal",
        description: "CorelDRAW subscription for professional graphic design. Vector illustration, layout, and photo editing software.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500"],
        category: "Design",
    tags: ["Design", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Canva Pro in Nepal - Best Price & Easy Setup",
        slug: "canva-pro-nepal",
        description: "Canva Pro subscription for professional designs. Access to premium templates, fonts, photos, and advanced features.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500"],
        category: "Design",
    tags: ["Design", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Beautiful AI - Nepal",
        slug: "beautiful-ai-nepal",
        description: "Beautiful AI subscription for stunning presentations. AI-powered design tool that automatically creates professional slides.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1558403194-611308249627?w=500"],
        category: "AI",
    tags: ["AI", "Design"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Freepik Premium Account in Nepal",
        slug: "freepik-premium-nepal",
        description: "Freepik Premium unlimited downloads. Access millions of vectors, photos, PSD files, and icons for your projects.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1561070791-36c11767b26a?w=500"],
        category: "Design",
    tags: ["Design", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Adobe Creative Cloud in Nepal",
        slug: "adobe-creative-cloud-nepal",
        description: "Adobe Creative Cloud all apps subscription. Photoshop, Illustrator, Premiere Pro, and 20+ creative applications.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500"],
        category: "Design",
    tags: ["Design", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Envato Elements Premium in Nepal",
        slug: "envato-elements-nepal",
        description: "Envato Elements unlimited downloads. Access millions of creative assets including templates, graphics, and fonts.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1558403194-611308249627?w=500"],
        category: "Design",
    tags: ["Design", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // Entertainment
    {
        title: "Spotify Premium Nepal - Buy Instantly",
        slug: "spotify-premium-nepal",
        description: "Spotify Premium subscription for ad-free music streaming. Download songs, unlimited skips, and high-quality audio.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500"],
        category: "Entertainment",
    tags: ["Entertainment", "Music"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Zee5 Subscription in Nepal",
        slug: "zee5-nepal",
        description: "Zee5 Premium subscription for Indian content. Movies, TV shows, web series, and live TV in multiple languages.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500"],
        category: "Entertainment",
    tags: ["Entertainment"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Best Way to Buy Crunchyroll in Nepal",
        slug: "crunchyroll-nepal",
        description: "Crunchyroll Premium subscription for anime streaming. Ad-free anime, manga, and access to simulcasts.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500"],
        category: "Entertainment",
    tags: ["Entertainment", "Anime"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Sony Liv Premium in Nepal",
        slug: "sony-liv-nepal",
        description: "Sony Liv Premium for sports and entertainment. Live sports, movies, TV shows, and exclusive web series.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500"],
        category: "Entertainment",
    tags: ["Entertainment"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Prime Video Easily in Nepal",
        slug: "prime-video-nepal",
        description: "Amazon Prime Video subscription for unlimited streaming. Watch award-winning movies, series, and Prime Originals.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500"],
        category: "Entertainment",
    tags: ["Entertainment"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy YouTube Premium Subscription in Nepal",
        slug: "youtube-premium-nepal",
        description: "YouTube Premium for ad-free videos. Download videos, background play, and access to YouTube Music Premium.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500"],
        category: "Entertainment",
    tags: ["Entertainment"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Netflix Subscription in Nepal",
        slug: "netflix-nepal",
        description: "Netflix subscription for unlimited streaming. Watch movies, series, documentaries in HD/4K quality.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500"],
        category: "Entertainment",
    tags: ["Entertainment"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // VPN & Security
    {
        title: "McAfee Mobile Security Plus VPN",
        slug: "mcafee-vpn-nepal",
        description: "McAfee Total Protection with VPN. Antivirus, identity protection, and secure VPN for complete online security.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500"],
        category: "VPN",
    tags: ["VPN", "Security"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy HMA VPN in Nepal at Best Price",
        slug: "hma-vpn-nepal",
        description: "HMA VPN subscription for online privacy. Fast VPN with 1000+ servers worldwide and unlimited bandwidth.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500"],
        category: "VPN",
    tags: ["VPN"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Surfshark VPN in Nepal",
        slug: "surfshark-vpn-nepal",
        description: "Surfshark VPN subscription for unlimited devices. Fast, secure VPN with CleanWeb and MultiHop features.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500"],
        category: "VPN",
    tags: ["VPN"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Express VPN: Protect Your Online Privacy",
        slug: "expressvpn-nepal",
        description: "ExpressVPN subscription for ultimate privacy. Fastest VPN with 160 locations and 24/7 customer support.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500"],
        category: "VPN",
    tags: ["VPN"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Nord VPN in Nepal: Fast, Private & Easy Setup",
        slug: "nordvpn-nepal",
        description: "NordVPN subscription for online security. Military-grade encryption, no-logs policy, and threat protection.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500"],
        category: "VPN",
    tags: ["VPN"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // Education
    {
        title: "Get Cursor AI in Nepal | Official",
        slug: "cursor-ai-nepal",
        description: "Cursor AI subscription for AI-powered coding. IDE with built-in AI assistant for faster development.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500"],
        category: "AI",
    tags: ["AI", "Education", "Development"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Skillshare Premium Nepal: Buy Now",
        slug: "skillshare-premium-nepal",
        description: "Skillshare Premium for unlimited learning. Access 35,000+ classes in design, business, tech, and more.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500"],
        category: "Education",
    tags: ["Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Purchase Udemy Courses in Nepal",
        slug: "udemy-courses-nepal",
        description: "Udemy course access for professional development. Learn from expert instructors in tech, business, and creative skills.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"],
        category: "Education",
    tags: ["Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Coursera Plus in Nepal - Best Price & Easy Access",
        slug: "coursera-plus-nepal",
        description: "Coursera Plus subscription for unlimited learning. Access 7,000+ courses from top universities and companies.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500"],
        category: "Education",
    tags: ["Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Super Duolingo App in Nepal",
        slug: "super-duolingo-nepal",
        description: "Duolingo Super (Premium) for ad-free language learning. Unlimited hearts, progress tracking, and personalized lessons.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500"],
        category: "Education",
    tags: ["Education"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // Microsoft Products
    {
        title: "Get Microsoft Project Professional - Best Price",
        slug: "microsoft-project-nepal",
        description: "Microsoft Project Professional for project management. Advanced planning, scheduling, and resource management tools.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Microsoft"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Microsoft Office Activation Key in Nepal",
        slug: "microsoft-office-nepal",
        description: "Microsoft Office activation key. Word, Excel, PowerPoint, and Outlook for personal or business use.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Microsoft"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Windows Activation Key in Nepal",
        slug: "windows-activation-nepal",
        description: "Windows 11/10 activation key. Genuine license for secure and updated operating system.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Microsoft"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Microsoft 365 Personal in Nepal",
        slug: "microsoft-365-personal-nepal",
        description: "Microsoft 365 Personal subscription. Office apps, 1TB OneDrive storage, and premium features for 1 user.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Microsoft"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Microsoft 365 Family in Nepal",
        slug: "microsoft-365-family-nepal",
        description: "Microsoft 365 Family subscription for up to 6 users. Office apps, 6TB total storage, and premium features.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500"],
        category: "Productivity",
    tags: ["Productivity", "Microsoft"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },

    // Video Editing
    {
        title: "Buy Figma in Nepal at Best Price",
        slug: "figma-nepal",
        description: "Figma subscription for collaborative design. Professional UI/UX design tool for teams and individuals.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500"],
        category: "Design",
    tags: ["Design", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get CapCut Pro Nepal",
        slug: "capcut-pro-nepal",
        description: "CapCut Pro subscription for video editing. Professional editing tools, effects, and templates for content creators.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500"],
        category: "Video Editing",
    tags: ["Video Editing", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy HeyGen AI Online in Nepal",
        slug: "heygen-ai-nepal",
        description: "HeyGen AI subscription for AI video creation. Generate professional videos with AI avatars and voiceovers.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500"],
        category: "AI",
    tags: ["AI", "Video Editing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Invideo AI in Nepal - Trusted Source",
        slug: "invideo-ai-nepal",
        description: "InVideo AI subscription for video creation. AI-powered video editor with templates and smart editing features.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500"],
        category: "AI",
    tags: ["AI", "Video Editing"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Get Wondershare Filmora License in Nepal",
        slug: "wondershare-filmora-nepal",
        description: "Wondershare Filmora license for easy video editing. Intuitive interface with professional effects and transitions.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500"],
        category: "Video Editing",
    tags: ["Video Editing", "Productivity"],
        countInStock: 100,
        requiredFields: ["email"]
    
  },
    {
        title: "Buy Adobe Premiere Pro Nepal",
        slug: "adobe-premiere-pro-nepal",
        description: "Adobe Premiere Pro subscription for professional video editing. Industry-standard tool used by filmmakers worldwide.",
        price: 1000,
        images: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500"],
        category: "Video Editing",
    tags: ["Video Editing", "Design"],
        countInStock: 100,
        requiredFields: ["email"]
    
  }
];

module.exports = products;
