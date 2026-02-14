export const appData = {
    checklist: {
        startDate: '2025-07-21',
        endDate: '2025-09-30',
        items: {
            "bpc-157": { key: "bpc-157", name: "BPC-157", dose: "400mcg", inj: "12 IU", time: "AM", freq: "daily" },
            "bpc-157-pm": { key: "bpc-157", name: "BPC-157", dose: "400mcg", inj: "12 IU", time: "PM", freq: "daily" },
            "tb-500": { key: "tb-500", name: "TB-500", dose: "1mg", inj: "60 IU", time: "Any", freq: "daily" },
            "kpv": { key: "kpv", name: "KPV", dose: "400mcg", inj: "12 IU", time: "AM", freq: "daily" },
            "kpv-pm": { key: "kpv", name: "KPV", dose: "400mcg", inj: "12 IU", time: "PM", freq: "daily" },
            "collagen": { key: "collagen", name: "Collagen", dose: "15g", time: "AM", freq: "daily" },
            "collagen-pm": { key: "collagen", name: "Collagen", dose: "15g", time: "PM", freq: "daily" },
            "vit-c": { key: "vit-c", name: "Vit C", dose: "1g", time: "AM Meal", freq: "daily" },
            "vit-c-pm": { key: "vit-c", name: "Vit C", dose: "1g", time: "PM Meal", freq: "daily" },
            "vit-d": { key: "vit-d", name: "Vit D", dose: "5,000 IU", time: "With Meal", freq: "daily" },
            "ha-oral": { key: "ha", name: "Hyaluronic Acid", dose: "200mg", time: "Any", freq: "daily" },
            "ghk-cu": { key: "ghk-cu", name: "GHK-Cu", dose: "1mg", inj: "4 IU", time: "PM", freq: "daily" },
            "hgh": { key: "hgh", name: "HGH", dose: "1.5 IU", inj: "11 IU", time: "AM", freq: "daily" },
            "hgh-pm": { key: "hgh", name: "HGH", dose: "1.5 IU", inj: "11 IU", time: "PM", freq: "daily" },
            "rlt": { key: "rlt", name: "Red Light", dose: "10-15 min", time: "Any", freq: "eod" },
            "retatrutide-p3": { key: "retatrutide", name: "Retatrutide", dose: "4mg", inj: "120 IU (split)", time: "Any", freq: "weekly" }
        }
    },
    protocol: {
        "bpc-157": {
            name: "BPC-157",
            category: "Peptide",
            status: "research",
            info: {
                summary: "BPC-157, or Body Protection Compound-157, is a synthetic peptide consisting of 15 amino acids, derived from a protein found in human gastric juice known as Body Protection Compound (BPC). Discovered in the 1990s during research into gastric proteins, it was initially explored for its potential to treat ulcers and gastrointestinal disorders. However, its remarkable regenerative properties soon became evident, leading to extensive studies on its ability to accelerate healing across various tissues, including skin, muscle, tendons, ligaments, and the gut. BPC-157 promotes the formation of new blood vessels (angiogenesis), enhances collagen production, and exhibits potent anti-inflammatory effects, making it a promising tool for post-surgical recovery. Its localized action allows it to target specific injury sites effectively, while its systemic benefits support overall tissue health. Although not yet approved by the FDA, its safety profile in animal studies is encouraging, with ongoing research aimed at unlocking its full therapeutic potential.",
                mechanism: "BPC-157 primarily works by promoting angiogenesis, the process of forming new blood vessels, which enhances the delivery of oxygen and nutrients to damaged tissues. It stimulates the migration and proliferation of fibroblasts, the cells responsible for synthesizing collagen, a critical component of tissue repair. Additionally, it upregulates growth hormone receptors, potentially amplifying the effects of human growth hormone (HGH) when used concurrently. BPC-157 modulates inflammatory pathways by reducing pro-inflammatory cytokines and increasing anti-inflammatory mediators, creating an optimal healing environment. It also activates the FAK-paxillin signaling pathway, essential for cell migration and adhesion, and influences the expression of vascular endothelial growth factor (VEGF) to further support angiogenesis. Emerging research suggests neuroprotective effects, indicating potential benefits for nerve repair post-surgery.",
                notes: "Subcutaneous injection near (but not into) surgical incisions is the most effective method for localized tissue healing, delivering BPC-157 directly to the site of injury. Its synergy with HGH may enhance overall regenerative outcomes. Sourcing from reputable suppliers is critical due to its unregulated status, ensuring purity and minimizing contamination risks. While animal studies report no significant toxicity, its long-term effects in humans remain unknown, necessitating caution and professional oversight. BPC-157 may also support gastrointestinal health and reduce scar formation, making it a versatile component of recovery protocols."
            },
            risk: { status: "Unapproved drug; not for human use.", primary: "Lack of long-term human safety data; significant sourcing risks (purity, contaminants). Reported side effects are generally mild: nausea, fatigue, dizziness.", monitoring: "Unknown long-term effects." }
        },
        "tb-500": {
            name: "TB-500",
            category: "Peptide",
            status: "research",
            info: {
                summary: "TB-500 is a synthetic version of Thymosin Beta-4 (Tβ4), a 43-amino-acid peptide naturally present in high concentrations in blood platelets, wound fluid, and various tissues. It plays a pivotal role in systemic healing by regulating actin, a fundamental protein in cell structure and movement. Extensively studied in animal models, TB-500 accelerates recovery from injuries to skin, muscle, tendons, and ligaments by promoting angiogenesis, reducing inflammation, and enhancing stem cell migration. Its systemic effects make it ideal for whole-body repair, particularly in post-surgical contexts where widespread tissue damage occurs. While not FDA-approved, its use in athletic and regenerative communities highlights its potential, though human clinical data remains limited.",
                mechanism: "TB-500 upregulates actin, facilitating cell migration, differentiation, and proliferation across the body. It acts as a systemic signal, attracting repair cells to injury sites and promoting angiogenesis to improve blood flow. Its anti-inflammatory properties reduce swelling and pain, while its ability to enhance stem cell activity accelerates tissue regeneration. TB-500 also boosts mitochondrial function, increasing cellular energy for healing processes.",
                notes: "Administered subcutaneously, a daily dose ensures steady systemic support. Often paired with BPC-157 for synergistic effects, TB-500’s broad action complements localized therapies. Its experimental nature requires careful sourcing and monitoring."
            },
            risk: { status: "Unapproved drug; not for human use.", primary: "Lack of long-term human safety data. Its potent angiogenic properties mean it could theoretically promote tumor growth.", monitoring: "Contraindicated in individuals with a history of or active cancer." }
        },
        "ghk-cu": {
            name: "GHK-Cu",
            category: "Peptide",
            status: "research",
            info: {
                summary: "GHK-Cu is a copper-binding tripeptide naturally occurring in human plasma, known for its role in dermal remodeling and tissue regeneration. First identified in the 1970s, it declines with age, correlating with reduced healing capacity. The injectable form delivers systemic benefits, supporting skin health, wound healing, and anti-aging by stimulating collagen and elastin production while clearing damaged proteins. Research also explores its potential in hair growth and neuroprotection, making it a multifaceted recovery tool.",
                mechanism: "GHK-Cu regulates extracellular matrix (ECM) turnover, promoting healthy collagen and elastin synthesis while removing disorganized scar tissue. It modulates gene expression to favor regeneration, enhances antioxidant defenses, and supports angiogenesis, improving tissue oxygenation.",
                notes: "Systemic administration via injection maximizes its widespread effects. Its copper content requires monitoring to avoid excess, particularly in those with copper metabolism issues."
            },
            risk: { status: "Unapproved drug; not for human use.", primary: "Lack of human safety data. Potential for injection site reactions, flushing, or nausea. Systemic copper administration carries risks.", monitoring: "Contraindicated in individuals with copper metabolism disorders (e.g., Wilson's disease)." }
        },
        "kpv": {
            name: "KPV",
            category: "Peptide",
            status: "research",
            info: {
                summary: "KPV, a tripeptide derived from alpha-melanocyte-stimulating hormone (α-MSH), is renowned for its potent anti-inflammatory properties. It excels at controlling post-surgical inflammation, reducing pain and swelling without suppressing the necessary immune response. Its antimicrobial effects further protect healing tissues, making it a key player in early recovery phases.",
                mechanism: "KPV inhibits inflammatory pathways like NF-κB, reducing pro-inflammatory cytokine production while promoting resolution. It also disrupts microbial growth, enhancing tissue safety.",
                notes: "Subcutaneous injections provide systemic anti-inflammatory benefits. Ideal for acute inflammation management, KPV’s mild side effect profile supports its experimental use."
            },
            risk: { status: "Unapproved peptide; not for human use.", primary: "Lack of human safety data. Reported side effects are typically mild, such as minor GI or skin reactions.", monitoring: "Unknown long-term effects." }
        },
        "hgh": {
            name: "HGH",
            category: "Hormone",
            status: "prescription",
            info: {
                summary: "Human Growth Hormone (HGH), or somatropin, is a pituitary-derived hormone driving regeneration, growth, and metabolism. Its synthetic form enhances post-surgical healing by boosting collagen synthesis and cell repair across the body. Widely used in regenerative medicine, HGH requires careful dosing due to its potency.",
                mechanism: "HGH stimulates IGF-1 production, promoting cell proliferation and collagen formation. It enhances protein synthesis and fat metabolism, fueling tissue repair.",
                notes: "AM/PM split dosing stabilizes levels and minimizes side effects. Prescription-only status mandates medical supervision."
            },
            risk: { status: "Prescription drug. Off-label distribution is illegal.", primary: "Edema, arthralgia, carpal tunnel syndrome, impaired glucose tolerance.", monitoring: "Contraindicated in acute critical illness post-surgery and in active cancer." }
        },
        "retatrutide": {
            name: "Retatrutide",
            category: "Peptide",
            status: "experimental",
            info: {
                summary: "Retatrutide is an experimental triple-receptor agonist (GLP-1, GIP, glucagon) designed for metabolic optimization and inflammation control. Under investigation for obesity and metabolic disorders, it supports healing by improving energy allocation and reducing systemic inflammation.",
                mechanism: "It enhances insulin sensitivity, lipid profiles, and blood pressure, directing energy to repair while lowering inflammation via multi-receptor action.",
                notes: "Highly experimental; its 4mg dose requires split injections. Use is speculative, based on emerging research."
            },
            risk: { status: "Investigational new drug (in clinical trials).", primary: "Nausea, GI issues; long-term safety unknown.", monitoring: "Not legally available outside clinical trials." }
        },
        "collagen": {
            name: "Collagen",
            category: "Supplement",
            status: "supplement",
            info: {
                summary: "Collagen, the body’s most abundant protein, provides essential amino acids (glycine, proline) for skin, joint, and bone repair. Hydrolyzed collagen supplements enhance wound healing, elasticity, and hydration, supporting post-surgical recovery.",
                mechanism: "Supplies building blocks for Type I and III collagen, stimulating endogenous production and strengthening the dermal matrix.",
                notes: "Split 30g daily dose improves absorption. Hydrolyzed form ensures bioavailability."
            },
            risk: { status: "Supplement (GRAS)", primary: "Generally very low risk.", monitoring: "Follow recommended dosage." }
        },
        "vit-c": {
            name: "Vit C",
            category: "Supplement",
            status: "supplement",
            info: {
                summary: "Vitamin C is an essential cofactor for collagen synthesis and a powerful antioxidant, critical for tissue repair and immune support post-surgery.",
                mechanism: "Facilitates collagen cross-linking by enzymes and neutralizes oxidative stress, protecting healing tissues.",
                notes: "High doses in divided increments maintain levels during recovery."
            },
            risk: { status: "Supplement (GRAS)", primary: "Low risk; high doses may cause GI upset.", monitoring: "Follow recommended dosage." }
        },
        "vit-d": {
            name: "Vit D",
            category: "Supplement",
            status: "supplement",
            info: {
                summary: "Vitamin D modulates immune function and cellular differentiation, vital for healing and infection prevention. Synthesized via sunlight or supplemented, it supports bone and tissue health.",
                mechanism: "Regulates cell proliferation and enhances calcium absorption, reducing recovery complications.",
                notes: "Dosage should correct pre-existing deficiencies, guided by blood tests."
            },
            risk: { status: "Supplement (GRAS)", primary: "Low risk at recommended doses; toxicity rare.", monitoring: "Follow recommended dosage." }
        },
        "ha": {
            name: "Hyaluronic Acid",
            category: "Supplement",
            status: "supplement",
            info: {
                summary: "Hyaluronic Acid, a key skin matrix component, hydrates and supports tissue repair across all healing phases.",
                mechanism: "Facilitates cell migration and reduces inflammation, enhancing structural integrity.",
                notes: "Oral and topical use improves hydration and elasticity."
            },
            risk: { status: "Supplement (GRAS)", primary: "Generally very low risk.", monitoring: "Follow recommended dosage." }
        },
        "rlt": {
            name: "Red Light",
            category: "Therapy",
            status: "device",
            info: {
                summary: "Red Light Therapy uses specific light wavelengths (630-850nm) to boost cellular energy and healing non-invasively, aiding skin repair and inflammation reduction.",
                mechanism: "Photons enhance mitochondrial ATP production, accelerating collagen synthesis, angiogenesis, and blood flow.",
                notes: "Requires red and near-infrared devices; safe and effective as an adjunct therapy."
            },
            risk: { status: "FDA-cleared devices exist", primary: "Low risk; potential skin/eye irritation.", monitoring: "Use eye protection." }
        }
    }
};

export const unifiedItems = ['bpc-157', 'bpc-157-pm', 'tb-500', 'kpv', 'kpv-pm', 'collagen', 'collagen-pm', 'vit-c', 'vit-c-pm', 'vit-d', 'ha-oral', 'ghk-cu', 'hgh', 'hgh-pm', 'rlt', 'retatrutide-p3'];

export const injectableKeys = new Set(['bpc-157', 'tb-500', 'kpv', 'ghk-cu', 'hgh']);

export const phaseDetails = {
    inflammation: {
        title: 'Phase I: Inflammation',
        body: `<p class="mb-4">Immediately after surgery your body enters a protective inflammatory response. Swelling, warmth and soreness are signs that immune cells are rushing in to defend the area and begin repairing damaged tissue. Rest, ice and elevation are key during this time to keep discomfort manageable while still allowing blood flow.</p>
               <p class="mb-4">Short bouts of gentle movement help circulate lymph and prevent stiffness, but you should avoid pushing into pain. Supportive garments or wraps can reduce excessive fluid build-up around the incision. Maintain any medication schedule prescribed by your doctor and pay attention to early warning signs of infection such as fever or unusual redness.</p>
               <p class="mb-4">Good sleep and adequate hydration give your body the building blocks it needs to start knitting tissue back together. Most people will notice swelling peak around day three and then slowly begin to subside. Patience is essential—trying to speed this stage often leads to setbacks.</p>`
    },
    proliferation: {
        title: 'Phase II: Proliferation',
        body: `<p class="mb-4">Within a week new cells and collagen fibers actively rebuild the surgical site. Light activity like short walks or stretching increases nutrient delivery and encourages proper alignment of the developing tissue. Pain typically decreases, though fatigue may linger as your body uses a great deal of energy to regenerate.</p>
               <p class="mb-4">A nutrient-dense diet becomes especially important. Lean proteins, colorful vegetables and adequate water support the creation of fresh connective tissue. Your care team may introduce targeted physical therapy or massage to minimize scar tissue and encourage a healthy range of motion.</p>
               <p class="mb-4">Listen closely to your body and scale activities accordingly. While many people feel better during this stage, overexertion can easily inflame healing tissues. Consistency and moderate effort provide far better results than sporadic bursts of high intensity.</p>`
    },
    remodeling: {
        title: 'Phase III: Remodeling',
        body: `<p class="mb-4">Several weeks in, the focus shifts from creating new tissue to strengthening it. Collagen fibers reorganize along lines of tension, gradually improving durability. You can begin reintroducing more demanding movements, but continue to respect any lingering soreness or tightness.</p>
               <p class="mb-4">Functional exercises and daily activities help your body adapt to the stresses of normal life. Keep monitoring the incision for signs of irritation and consider gentle scar massage or silicone treatments if recommended by your provider.</p>
               <p class="mb-4">Long-term recovery hinges on maintaining good habits established earlier: quality sleep, balanced nutrition and progressive movement. Even when you feel nearly back to normal, underlying tissues continue maturing for months. Staying consistent during this phase sets the stage for a full and lasting return to your usual routine.</p>`
    }
};
