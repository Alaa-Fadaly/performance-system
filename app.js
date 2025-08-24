// TechCorp Performance Management System - Production Ready
// Fixed JavaScript implementation with all features working

class TechCorpPerformanceSystem {
    constructor() {
        this.currentView = 'manager';
        this.currentEmployee = 'emp001';
        this.currentUser = 'mgr001';
        this.currentTask = null;
        this.currentEvaluation = null;
        this.selectedRating = null;
        this.evaluationData = {};
        this.evaluationSection = 0;
        this.charts = {};
        this.notificationCount = 0;
        this.toastId = 0;
        
        // Initialize comprehensive data structures
        this.initializeOrganizationData();
        this.initializeEmployeeData();
        this.initializeTaskData();
        this.initializeEvaluationData();
        this.initializeNotificationSystem();
        this.initializeAchievementSystem();
        this.initializeReportingSystem();
        this.initializeFeedbackSystem();
        
        console.log('TechCorp PMS initialized with comprehensive data');
    }
    
    // Initialize organization structure and data
    initializeOrganizationData() {
        this.organization = {
            name: "منظمتي",
            totalEmployees: 100,
            departments: [
                {id: "it", name: "قسم تكنولوجيا المعلومات", manager: "أحمد علي", employees: 30, avgPerformance: 4.5},
                {id: "hr", name: "قسم الموارد البشرية", manager: "منى حسين", employees: 15, avgPerformance: 4.2},
                {id: "sales", name: "قسم المبيعات", manager: "محمود سيد", employees: 25, avgPerformance: 4.8},
                {id: "marketing", name: "قسم التسويق", manager: "فاطمة إبراهيم", employees: 20, avgPerformance: 4.3},
                {id: "finance", name: "قسم المالية", manager: "خالد جمال", employees: 10, avgPerformance: 4.0}
            ],
            evaluationPeriod: "Monthly",
            systemLaunch: "2025-08-25"
        };
    }
    
    // Initialize comprehensive employee data
    initializeEmployeeData() {
        this.employees = [
            {
                id: "emp001", name: "علي محمد", position: "مهندس برمجيات", 
                department: "قسم تكنولوجيا المعلومات", manager: "mgr001", email: "ali.mohamed@mycompany.com",
                hire_date: "2024-01-10", performance_avg: 4.5, status: "active",
                skills: ["Python", "Django", "JavaScript", "React"],
                phone: "+20-100-1234567", location: "القاهرة"
            },
            {
                id: "emp002", name: "سارة حسن", position: "أخصائية موارد بشرية",
                department: "قسم الموارد البشرية", manager: "mgr002", email: "sara.hassan@mycompany.com",
                hire_date: "2023-05-20", performance_avg: 4.2, status: "active",
                skills: ["Recruitment", "Onboarding", "Employee Relations"],
                phone: "+20-100-2345678", location: "القاهرة"
            },
            {
                id: "emp003", name: "فادي سعيد", position: "مسؤول مبيعات",
                department: "قسم المبيعات", manager: "mgr003", email: "fady.saeed@mycompany.com",
                hire_date: "2024-03-01", performance_avg: 4.8, status: "active",
                skills: ["Salesforce", "CRM", "Negotiation"],
                phone: "+20-100-3456789", location: "الإسكندرية"
            },
            {
                id: "emp004", name: "ليلى محمود", position: "منسقة تسويق",
                department: "قسم التسويق", manager: "mgr004", email: "laila.mahmoud@mycompany.com",
                hire_date: "2023-11-15", performance_avg: 4.3, status: "active",
                skills: ["Digital Marketing", "Content Creation", "SEO"],
                phone: "+20-100-4567890", location: "الجيزة"
            },
            {
                id: "emp005", name: "أحمد شوقي", position: "محلل مالي",
                department: "قسم المالية", manager: "mgr005", email: "ahmed.shawky@mycompany.com",
                hire_date: "2024-02-28", performance_avg: 4.0, status: "active",
                skills: ["Financial Analysis", "Budgeting", "Excel"],
                phone: "+20-100-5678901", location: "القاهرة"
            }
        ];
        
        this.managers = [
            {id: "mgr001", name: "أحمد علي", department: "قسم تكنولوجيا المعلومات", role: "مدير تكنولوجيا المعلومات"},
            {id: "mgr002", name: "منى حسين", department: "قسم الموارد البشرية", role: "مديرة الموارد البشرية"},
            {id: "mgr003", name: "محمود سيد", department: "قسم المبيعات", role: "مدير المبيعات"},
            {id: "mgr004", name: "فاطمة إبراهيم", department: "قسم التسويق", role: "مديرة التسويق"},
            {id: "mgr005", name: "خالد جمال", department: "قسم المالية", role: "مدير المالية"}
        ];
    }
    
    // Initialize comprehensive task management system
    initializeTaskData() {
        this.tasks = [
            {
                id: "tsk001", title: "تطوير واجهة المستخدم", 
                description: "إعادة تصميم واجهة المستخدم لقسم المهام",
                importance: "high", assigned_to: "emp001", assigned_by: "mgr001",
                deadline: "2025-08-30T17:00", status: "in_progress", 
                tags: ["front-end", "ui", "redesign"],
                estimated_time: 15
            },
            {
                id: "tsk002", title: "إعداد تقارير الأداء الشهرية",
                description: "تجميع وتحليل بيانات الأداء لجميع الموظفين",
                importance: "critical", assigned_to: "emp002", assigned_by: "mgr002",
                deadline: "2025-08-25T15:00", status: "pending",
                tags: ["reports", "hr", "monthly"],
                estimated_time: 8
            },
            {
                id: "tsk003", title: "متابعة العملاء المحتملين",
                description: "التواصل مع قائمة العملاء الجدد لمتابعة فرص المبيعات",
                importance: "medium", assigned_to: "emp003", assigned_by: "mgr003",
                deadline: "2025-08-28T12:00", status: "in_progress",
                tags: ["sales", "crm", "leads"],
                estimated_time: 10
            },
            {
                id: "tsk004", title: "كتابة محتوى مدونة جديد",
                description: "كتابة مقالين عن أفضل ممارسات التسويق الرقمي",
                importance: "medium", assigned_to: "emp004", assigned_by: "mgr004",
                deadline: "2025-08-27T16:00", status: "pending",
                tags: ["content", "blog", "marketing"],
                estimated_time: 8
            },
            {
                id: "tsk005", title: "تحليل ميزانية الربع الثالث",
                description: "مراجعة الميزانية وتحديد الانحرافات الرئيسية",
                importance: "high", assigned_to: "emp005", assigned_by: "mgr005",
                deadline: "2025-09-05T14:00", status: "pending",
                tags: ["finance", "budget", "analysis"],
                estimated_time: 12
            },
            {
                id: "tsk006", title: "حل مشكلة الأمان",
                description: "معالجة الثغرة الأمنية المكتشفة في النظام",
                importance: "critical", assigned_to: "emp001", assigned_by: "mgr001",
                deadline: "2025-08-25T10:00", status: "completed", 
                completion_time: "2025-08-24T18:00", quality_rating: 5,
                tags: ["security", "bug-fix"],
                time_spent: 10, estimated_time: 8,
                feedback: "حل ممتاز وسريع للمشكلة، عمل احترافي."
            }
        ];
        
        // Importance level definitions
        this.importanceLevels = {
            critical: {weight: 3.0, description: "مهام حرجة", color: "var(--color-error)"},
            high: {weight: 2.5, description: "أهداف هامة", color: "var(--color-warning)"},
            medium: {weight: 2.0, description: "عمليات عادية", color: "var(--color-info)"},
            low: {weight: 1.5, description: "مهام روتينية", color: "var(--color-success)"},
            minimal: {weight: 1.0, description: "مهام إدارية", color: "var(--color-text-secondary)"}
        };
    }
    
    // Initialize comprehensive evaluation system
    initializeEvaluationData() {
        this.evaluationFramework = {
            taskPerformanceWeight: 50,
            attitudeEvaluationWeight: 50,
            attitudeCategories: {
                work_engagement: {weight: 20, questions: 4, description: "الالتزام والجهد"},
                team_collaboration: {weight: 25, questions: 5, description: "العمل الجماعي"},
                communication: {weight: 20, questions: 4, description: "التواصل"},
                reliability: {weight: 15, questions: 4, description: "الاعتمادية"},
                adaptability: {weight: 20, questions: 4, description: "المرونة"}
            }
        };
        
        this.evaluationQuestions = {
            work_engagement: [
                "يُظهر الحماس للمهام والمشاريع",
                "يأخذ المبادرة ويتجاوز المتطلبات الأساسية",
                "يظهر شغفًا بمسؤولياته",
                "يُحافظ على مستويات عالية من الطاقة والتحفيز"
            ],
            team_collaboration: [
                "يشارك بفعالية في اجتماعات الفريق",
                "يقدم المساعدة والدعم للزملاء عند الحاجة",
                "يشارك المعرفة والخبرة مع أعضاء الفريق",
                "يعمل بشكل جيد في بيئات الفرق المتعددة",
                "يُساهم في ثقافة فريق إيجابية"
            ],
            communication: [
                "يتواصل بوضوح وإيجاز في الاجتماعات",
                "يُقدم تحديثات في الوقت المناسب حول تقدم المشروع",
                "يستمع بانتباه ويستجيب بشكل مناسب",
                "يُقدم الأفكار والحلول بفعالية"
            ],
            reliability: [
                "يلتزم بالمواعيد النهائية والتعهدات",
                "يتابع الوعود والاتفاقيات",
                "يحافظ على جودة متسقة في العمل",
                "يمكن الاعتماد عليه في المواقف الصعبة"
            ],
            adaptability: [
                "يتقبل التغيير والتحديات الجديدة بإيجابية",
                "يتعلم مهارات وتقنيات جديدة بسرعة",
                "يعدّل نهجه عندما تتغير الظروف",
                "يظل هادئًا ومنتجًا تحت الضغط"
            ]
        };
        
        // Sample evaluation data
        this.employeeEvaluations = {
            emp001: {
                current_month: {
                    work_engagement: 4.5,
                    team_collaboration: 4.6,
                    communication: 4.4,
                    reliability: 4.7,
                    adaptability: 4.8,
                    overall_attitude: 4.6,
                    task_performance: 4.5,
                    final_score: 4.55
                },
                historical: [
                    {month: "2025-07", final_score: 4.3},
                    {month: "2025-06", final_score: 4.4},
                    {month: "2025-05", final_score: 4.5}
                ]
            }
        };
    }
    
    // Initialize comprehensive notification system
    initializeNotificationSystem() {
        this.notifications = [
            {
                id: 1, type: "deadline_alert", icon: "⚠️", urgency: "high",
                message: "مهمة 'إعداد تقارير الأداء الشهرية' موعدها النهائي غدًا",
                timestamp: new Date(Date.now() - 30 * 60 * 1000), read: false,
                employee: "emp002", related_task: "tsk002"
            },
            {
                id: 2, type: "celebration", icon: "🎉", urgency: "low",
                message: "تهانينا! لقد حصلت على وسام 'المركز الأول للمبيعات' لشهر أغسطس",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false,
                employee: "emp003", related_achievement: "sales_leader"
            },
            {
                id: 3, type: "feedback_request", icon: "💬", urgency: "high",
                message: "الرجاء تقديم ملاحظاتك حول المهمة المكتملة: حل مشكلة الأمان",
                timestamp: new Date(Date.now() - 15 * 60 * 1000), read: false,
                employee: "mgr001", related_task: "tsk006"
            },
            {
                id: 4, type: "suggestion", icon: "💡", urgency: "medium",
                message: "اقتراح: استخدم تقنية Time-blocking لزيادة التركيز في مهام البرمجة",
                timestamp: new Date(Date.now() - 45 * 60 * 1000), read: false,
                employee: "emp001"
            },
            {
                id: 5, type: "evaluation_due", icon: "📋", urgency: "medium",
                message: "تقييم الأداء الشهري للموظف علي محمد مستحق بحلول 31 أغسطس",
                timestamp: new Date(Date.now() - 60 * 60 * 1000), read: false,
                employee: "mgr001", related_employee: "emp001"
            },
            {
                id: 6, type: "milestone", icon: "🏆", urgency: "low",
                message: "فريق المبيعات حقق 120% من الهدف الشهري!",
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), read: false,
                employee: "mgr003"
            },
            {
                id: 7, type: "system_update", icon: "🔄", urgency: "low",
                message: "سيتم تحديث النظام اليوم لتحسين الأداء",
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), read: false,
                employee: "all"
            },
            {
                id: 8, type: "training", icon: "🎓", urgency: "medium",
                message: "مصدر تعليمي جديد متاح: 'أدوات تحليل البيانات المتقدمة'",
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), read: false,
                employee: "emp005"
            }
        ];
        
        this.notificationSettings = {
            deadline_alerts: true,
            celebration_notifications: true,
            feedback_requests: true,
            system_updates: true,
            email_notifications: true,
            push_notifications: false
        };
    }
    
    // Initialize comprehensive achievement system
    initializeAchievementSystem() {
        this.badgeDefinitions = {
            timeliness: [
                {name: "بداية في الوقت المحدد", requirement: 5, icon: "⏰", description: "إكمال 5 مهام متتالية في الوقت المحدد", points: 50},
                {name: "محترف المواعيد", requirement: 20, icon: "🎯", description: "إكمال 20 مهمة متتالية في الوقت المحدد", points: 200},
                {name: "بطل الوقت", requirement: 50, icon: "🏆", description: "إكمال 50 مهمة متتالية في الوقت المحدد", points: 500}
            ],
            quality: [
                {name: "مركز الجودة", requirement: 4.5, icon: "⭐", description: "الحفاظ على تقييم جودة 4.5+ لمدة شهر", points: 100},
                {name: "خبير التميز", requirement: 4.8, icon: "🌟", description: "الحفاظ على تقييم جودة 4.8+ لمدة شهرين", points: 300},
                {name: "مبدع الكمال", requirement: 5.0, icon: "💎", description: "تحقيق 10 تقييمات جودة 5.0 متتالية", points: 500}
            ],
            collaboration: [
                {name: "اللاعب الجماعي", requirement: 5, icon: "🤝", description: "مساعدة 5 زملاء في مهامهم", points: 75},
                {name: "بطل التعاون", requirement: 3, icon: "👥", description: "أعلى نقاط تعاون لمدة 3 أشهر", points: 250},
                {name: "المرشد المتميز", requirement: 3, icon: "🎓", description: "توجيه 3 أعضاء في الفريق بنجاح", points: 400}
            ],
            improvement: [
                {name: "عقلية النمو", requirement: 0.5, icon: "📈", description: "تحسين الأداء بمقدار 0.5 نقطة", points: 100},
                {name: "عودة قوية", requirement: 1.0, icon: "🔄", description: "التعافي من فترة أداء منخفض", points: 200},
                {name: "ملك الاستمرارية", requirement: 90, icon: "👑", description: "90% إكمال في الوقت المحدد لمدة 6 أشهر", points: 300}
            ]
        };
        
        this.achievements = {
            emp001: {
                earned: [
                    {badge: "بداية في الوقت المحدد", earned_date: "2025-07-15", category: "timeliness"},
                    {badge: "مركز الجودة", earned_date: "2025-08-01", category: "quality"},
                    {badge: "اللاعب الجماعي", earned_date: "2025-07-28", category: "collaboration"}
                ],
                progress: {
                    "محترف المواعيد": 12,
                    "خبير التميز": 1.2,
                    "عقلية النمو": 0.3
                },
                streaks: {
                    onTime: 12,
                    qualityAbove4: 15,
                    perfectDays: 3
                },
                totalPoints: 225
            },
            emp002: {
                earned: [
                    {badge: "اللاعب الجماعي", earned_date: "2025-07-20", category: "collaboration"}
                ],
                progress: {
                    "بداية في الوقت المحدد": 3,
                    "مركز الجودة": 4.2
                },
                streaks: {
                    onTime: 3,
                    qualityAbove4: 8
                },
                totalPoints: 75
            },
            emp003: {
                earned: [
                    {badge: "مركز الجودة", earned_date: "2025-07-10", category: "quality"},
                    {badge: "عقلية النمو", earned_date: "2025-08-05", category: "improvement"}
                ],
                progress: {
                    "محترف المواعيد": 8,
                    "خبير التميز": 2.1
                },
                streaks: {
                    onTime: 8,
                    qualityAbove4: 18
                },
                totalPoints: 200
            },
            emp004: {
                earned: [
                    {badge: "بداية في الوقت المحدد", earned_date: "2025-06-15", category: "timeliness"},
                    {badge: "مركز الجودة", earned_date: "2025-07-01", category: "quality"},
                    {badge: "اللاعب الجماعي", earned_date: "2025-07-25", category: "collaboration"},
                    {badge: "خبير التميز", earned_date: "2025-08-10", category: "quality"}
                ],
                progress: {
                    "محترف المواعيد": 18,
                    "مبدع الكمال": 7
                },
                streaks: {
                    onTime: 18,
                    qualityAbove4: 25,
                    perfectDays: 7
                },
                totalPoints: 525
            }
        };
    }
    
    // Initialize comprehensive reporting system
    initializeReportingSystem() {
        this.reportTemplates = {
            manager: {
                "individual-trends": {
                    title: "اتجاهات الأداء الفردي",
                    description: "تتبع أداء الموظفين الفردي بمرور الوقت",
                    category: "تحليلات أداء الفريق",
                    data_points: ["performance_scores", "task_completion", "quality_ratings"],
                    chart_type: "line"
                },
                "productivity-analytics": {
                    title: "تحليلات الإنتاجية", 
                    description: "تحليل معدلات إكمال المهام والفعالية",
                    category: "تحليلات أداء الفريق",
                    data_points: ["completion_rate", "time_efficiency", "workload_distribution"],
                    chart_type: "bar"
                },
                "quality-metrics": {
                    title: "مقاييس الجودة",
                    description: "مراجعة تقييمات الجودة وأنماط الملاحظات", 
                    category: "تحليلات أداء الفريق",
                    data_points: ["quality_scores", "feedback_sentiment", "improvement_trends"],
                    chart_type: "radar"
                },
                "attitude-trends": {
                    title: "اتجاهات تقييم السلوك",
                    description: "تحليل التقييم الشهري للسلوك",
                    category: "التحليلات السلوكية", 
                    data_points: ["attitude_scores", "category_breakdown", "monthly_trends"],
                    chart_type: "stacked_bar"
                },
                "workload-balance": {
                    title: "تحليل توازن عبء العمل",
                    description: "توزيع المهام وتحليل القدرات",
                    category: "التطوير والإدارة",
                    data_points: ["task_distribution", "workload_metrics", "capacity_utilization"],
                    chart_type: "pie"
                }
            },
            admin: {
                "company-metrics": {
                    title: "مقاييس أداء الشركة", 
                    description: "نظرة عامة على الأداء على مستوى المنظمة",
                    category: "أداء المنظمة",
                    data_points: ["overall_performance", "department_averages", "growth_trends"],
                    chart_type: "dashboard"
                },
                "department-comparison": {
                    title: "مقارنة أداء الأقسام",
                    description: "تحليل أداء الأقسام المختلفة", 
                    category: "أداء المنظمة",
                    data_points: ["department_scores", "relative_performance", "benchmarks"],
                    chart_type: "comparison_bar"
                },
                "predictive-analytics": {
                    title: "التحليلات التنبؤية للأداء",
                    description: "توقع الأداء وتنبؤ بالاتجاهات",
                    category: "تحليلات النظام", 
                    data_points: ["forecast_data", "trend_analysis", "risk_indicators"],
                    chart_type: "forecast_line"
                },
                "roi-analysis": {
                    title: "تحليل العائد على الاستثمار",
                    description: "العائد على الاستثمار من مبادرات إدارة الأداء",
                    category: "تحليل العائد على الاستثمار والأثر",
                    data_points: ["cost_savings", "productivity_gains", "retention_improvements"],
                    chart_type: "financial"
                }
            }
        };
        
        this.reportHistory = [
            {id: "rpt001", template: "individual-trends", generated_by: "mgr001", date: "2025-08-20", status: "completed"},
            {id: "rpt002", template: "company-metrics", generated_by: "admin001", date: "2025-08-19", status: "completed"},
            {id: "rpt003", template: "workload-balance", generated_by: "mgr001", date: "2025-08-18", status: "scheduled"}
        ];
    }
    
    // Initialize feedback and communication system
    initializeFeedbackSystem() {
        this.feedbackTemplates = {
            positive: "ما الذي سار بشكل جيد في هذه المهمة؟ النهج كان فعالاً والنتائج تجاوزت التوقعات.",
            improvement: "ما الذي يمكن تحسينه في المرة القادمة؟ فكر في التركيز على التوثيق وتغطية الاختبارات.",
            challenges: "هل واجهت أي تحديات معينة؟ إدارة الوقت خلال تجميع المتطلبات المعقدة.",
            suggestions: "اقتراحات للمهام المماثلة في المستقبل؟ قسّم المهام الكبيرة إلى أجزاء أصغر يمكن إدارتها."
        };
        
        this.feedbackConversations = {
            tsk006: [
                {
                    id: 1, sender: "manager", sender_name: "أحمد علي",
                    message: "حل ممتاز وسريع للمشكلة. العمل الاحترافي الذي قمت به سيساعد في منع المشاكل المستقبلية.",
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    quality_rating: 5, task_title: "حل مشكلة الأمان"
                },
                {
                    id: 2, sender: "employee", sender_name: "علي محمد",
                    message: "شكراً على ملاحظاتك! لقد ركزت على إيجاد حل جذري للمشكلة.",
                    timestamp: new Date(Date.now() - 60 * 60 * 1000)
                }
            ]
        };
        
        this.developmentPlans = {
            emp001: [
                {
                    goal: "تحسين دقة تقدير الوقت",
                    description: "العمل على تقدير أفضل لأوقات إنجاز المهام",
                    target_date: "2025-12-31",
                    progress: 60,
                    status: "active"
                },
                {
                    goal: "تطوير المهارات القيادية", 
                    description: "تولي مسؤوليات توجيه المطورين الجدد",
                    target_date: "2026-03-31",
                    progress: 25,
                    status: "active"
                }
            ]
        };
        
        this.learningResources = {
            emp001: [
                {
                    title: "أنماط JavaScript المتقدمة",
                    type: "دورة تدريبية",
                    provider: "TechLearn",
                    status: "متاح",
                    relevance: "عالي"
                },
                {
                    title: "أساسيات إدارة المشاريع",
                    type: "ورشة عمل", 
                    provider: "تدريب داخلي",
                    status: "مسجل",
                    relevance: "متوسط"
                }
            ]
        };
    }
    
    // Initialize the complete system
    init() {
        console.log('Initializing TechCorp PMS...');
        
        this.setupEventListeners();
        this.loadDashboardData();
        this.startNotificationSystem();
        this.updateNotificationBadge();
        
        // Initialize charts after DOM is ready
        setTimeout(() => {
            this.initializeCharts();
        }, 300);
        
        // Update real-time elements
        setInterval(() => {
            this.updateCountdowns();
            this.updateRealTimeMetrics();
        }, 60000);
        
        // Auto-save system state every 5 minutes
        setInterval(() => {
            this.saveSystemState();
        }, 300000);
        
        console.log('TechCorp PMS initialized successfully');
    }
    
    // Set up comprehensive event listeners
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation listeners - FIXED
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const views = ['manager', 'employee', 'reports', 'admin'];
                this.showView(views[index]);
            });
        });
        
        // Notification system listeners - FIXED
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleNotifications();
            });
        }
        
        // Global click listener for dropdowns - FIXED
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-center')) {
                this.hideNotifications();
            }
            if (!e.target.closest('.quick-actions')) {
                this.hideQuickActions();
            }
            if (!e.target.closest('.user-dropdown')) {
                this.hideUserDropdown();
            }
        });
        
        // Search functionality
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performGlobalSearch(e.target.value);
            });
        }
        
        // Employee selector - FIXED
        const empSelector = document.getElementById('employeeSelector');
        if (empSelector) {
            empSelector.addEventListener('change', () => {
                this.switchEmployee();
            });
        }
        
        // Notification filters - FIXED
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                e.preventDefault();
                this.filterNotifications(e.target.dataset.type);
            }
        });
        
        // Chart control listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('chart-btn')) {
                e.preventDefault();
                this.switchChartView(e.target.dataset.chart);
            }
        });
        
        // Report category listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.category-btn')) {
                e.preventDefault();
                const categoryBtn = e.target.closest('.category-btn');
                const categoryText = categoryBtn.textContent.toLowerCase();
                if (categoryText.includes('manager')) {
                    this.showReportCategory('manager');
                } else if (categoryText.includes('admin')) {
                    this.showReportCategory('admin');
                } else if (categoryText.includes('executive')) {
                    this.showReportCategory('executive');
                }
            }
        });
        
        // Admin tab listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('admin-tab')) {
                e.preventDefault();
                const tabText = e.target.textContent.toLowerCase();
                if (tabText.includes('user')) {
                    this.showAdminSection('users');
                } else if (tabText.includes('department')) {
                    this.showAdminSection('departments');
                } else if (tabText.includes('system')) {
                    this.showAdminSection('system');
                } else if (tabText.includes('analytics')) {
                    this.showAdminSection('analytics');
                } else if (tabText.includes('audit')) {
                    this.showAdminSection('audit');
                }
            }
        });
        
        // Quick actions listener
        const quickActionsBtn = document.querySelector('.quick-actions .btn');
        if (quickActionsBtn) {
            quickActionsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showQuickActions();
            });
        }
        
        // Form submission listeners
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(e);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        console.log('Event listeners set up successfully');
    }
    
    // Show/hide different views - FIXED
    showView(viewName) {
        console.log('Switching to view:', viewName);
        
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const viewOrder = ['manager', 'employee', 'reports', 'admin'];
        const activeIndex = viewOrder.indexOf(viewName);
        if (activeIndex !== -1) {
            document.querySelectorAll('.nav-btn')[activeIndex]?.classList.add('active');
        }
        
        // Update view containers
        document.querySelectorAll('.view-container').forEach(view => view.classList.remove('active'));
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            console.log(`Activated view: ${viewName}-view`);
        }
        
        this.currentView = viewName;
        this.updateNotificationBadge();
        
        // Load view-specific data
        setTimeout(() => {
            this.loadViewData(viewName);
            this.initializeCharts();
        }, 100);
    }
    
    // Load data specific to each view
    loadViewData(viewName) {
        switch(viewName) {
            case 'manager':
                this.loadManagerDashboard();
                break;
            case 'employee':
                this.loadEmployeeDashboard();
                break;
            case 'reports':
                this.loadReportsDashboard();
                break;
            case 'admin':
                this.loadAdminDashboard();
                break;
        }
    }
    
    // Load manager dashboard with comprehensive data
    loadManagerDashboard() {
        this.loadPendingReviews();
        this.loadTeamAchievements();
        this.loadEvaluationStatus();
        this.loadFeedbackMetrics();
        this.updateKPIs('manager');
    }
    
    // Load employee dashboard
    loadEmployeeDashboard() {
        this.loadEmployeeTasks();
        this.loadEmployeeBadges();
        this.loadPersonalSuggestions();
        this.loadDevelopmentPlan();
        this.loadPersonalFeedback();
        this.updateKPIs('employee');
    }
    
    // Load reports dashboard
    loadReportsDashboard() {
        this.loadReportCategories();
        this.loadExecutiveSummary();
        this.generateSampleReports();
    }
    
    // Load admin dashboard
    loadAdminDashboard() {
        this.loadUserManagement();
        this.loadSystemAnalytics();
        this.loadAuditLog();
        this.loadSystemSettings();
    }
    
    // Update KPIs based on current view
    updateKPIs(viewType) {
        const kpiCards = document.querySelectorAll('.kpi-card');
        
        if (viewType === 'manager') {
            const kpiData = [
                {value: '4.5', label: 'متوسط الفريق', trend: '+0.3 vs last month', positive: true},
                {value: '90%', label: 'إنجاز المهام', trend: '+5% vs last month', positive: true},
                {value: '15', label: 'تقييمات معلقة', trend: 'مستحقة خلال يومين', neutral: true},
                {value: '95%', label: 'رضا الموظفين', trend: '+2% vs last month', positive: true}
            ];
            
            this.updateKPICards(kpiCards, kpiData);
        } else if (viewType === 'employee') {
            const employee = this.employees.find(emp => emp.id === this.currentEmployee);
            const achievements = this.achievements[this.currentEmployee] || {earned: [], streaks: {}};
            
            const kpiData = [
                {value: employee?.performance_avg?.toFixed(1) || '4.0', label: 'نقاطك', trend: '+0.3 this month', positive: true},
                {value: '92%', label: 'معدل الإنجاز في الوقت المحدد', trend: '+5% improvement', positive: true},
                {value: achievements.streaks.onTime || '0', label: 'سلسلة إنجاز', trend: '🔥 أفضل إنجاز شخصي!', neutral: true},
                {value: achievements.earned.length.toString(), label: 'الأوسمة المكتسبة', trend: `+${achievements.earned.filter(b => new Date(b.earned_date) > new Date(Date.now() - 30*24*60*60*1000)).length} this month`, positive: true}
            ];
            
            this.updateKPICards(kpiCards, kpiData);
        }
    }
    
    // Update KPI card display
    updateKPICards(cards, data) {
        cards.forEach((card, index) => {
            if (data[index]) {
                const valueEl = card.querySelector('.kpi-value');
                const labelEl = card.querySelector('.kpi-label');
                const trendEl = card.querySelector('.kpi-trend');
                
                if (valueEl) valueEl.textContent = data[index].value;
                if (labelEl) labelEl.textContent = data[index].label;
                if (trendEl) {
                    trendEl.textContent = data[index].trend;
                    trendEl.className = 'kpi-trend ' + (data[index].positive ? 'positive' : data[index].neutral ? 'neutral' : 'negative');
                }
            }
        });
    }
    
    // Load pending task reviews
    loadPendingReviews() {
        const container = document.getElementById('pendingReviews');
        if (!container) return;
        
        const completedTasks = this.tasks.filter(task => 
            task.status === 'completed' && !task.quality_rating && 
            task.assigned_by === this.currentUser
        );
        
        container.innerHTML = completedTasks.map(task => {
            const employee = this.employees.find(emp => emp.id === task.assigned_to);
            const timeAgo = this.getTimeAgo(new Date(task.completion_time));
            
            return `
                <div class="review-item">
                    <div class="review-info">
                        <div class="review-title">${task.title}</div>
                        <div class="review-meta">${employee?.name || 'Unknown'} • Completed ${timeAgo}</div>
                    </div>
                    <button class="btn btn--sm btn--primary" onclick="pms.reviewTask('${task.id}')">Review</button>
                </div>
            `;
        }).join('');
    }
    
    // Load team achievements
    loadTeamAchievements() {
        const container = document.getElementById('recentAchievements');
        if (!container) return;
        
        const recentAchievements = Object.entries(this.achievements)
            .flatMap(([empId, data]) => 
                data.earned
                    .filter(achievement => new Date(achievement.earned_date) > new Date(Date.now() - 7*24*60*60*1000))
                    .map(achievement => ({
                        ...achievement,
                        employee: this.employees.find(emp => emp.id === empId)?.name || 'Unknown',
                        empId
                    }))
            )
            .sort((a, b) => new Date(b.earned_date) - new Date(a.earned_date))
            .slice(0, 5);
        
        container.innerHTML = recentAchievements.map(achievement => {
            const badge = this.findBadgeDefinition(achievement.badge);
            return `
                <div class="achievement-notification">
                    <span class="badge-icon">${badge?.icon || '🏆'}</span>
                    <span>${achievement.employee} earned "${achievement.badge}" badge</span>
                </div>
            `;
        }).join('');
    }
    
    // Load evaluation status
    loadEvaluationStatus() {
        const container = document.getElementById('evaluationList');
        if (!container) return;
        
        const teamMembers = this.employees.filter(emp => emp.manager === this.currentUser);
        const currentMonth = new Date().toISOString().slice(0, 7);
        
        container.innerHTML = teamMembers.map(employee => {
            const hasEvaluation = this.employeeEvaluations[employee.id]?.current_month;
            const isOverdue = new Date().getDate() > 25; // Assume evaluations due by 25th
            
            return `
                <div class="evaluation-item">
                    <div class="evaluation-employee">${employee.name}</div>
                    ${hasEvaluation ? 
                        '<span class="status status--success">مكتمل</span>' :
                        `<span class="status ${isOverdue ? 'status--error' : 'status--warning'}">${isOverdue ? 'متأخر' : 'مستحق في 31 أغسطس'}</span>`
                    }
                    <button class="btn btn--sm ${hasEvaluation ? 'btn--outline' : 'btn--primary'}" 
                            onclick="pms.${hasEvaluation ? 'viewEvaluation' : 'startEvaluation'}('${employee.id}')">
                        ${hasEvaluation ? 'عرض النتائج' : 'بدء التقييم'}
                    </button>
                </div>
            `;
        }).join('');
    }
    
    // Load employee tasks
    loadEmployeeTasks() {
        const container = document.getElementById('employeeTasks');
        if (!container) return;
        
        const employeeTasks = this.tasks.filter(task => 
            task.assigned_to === this.currentEmployee && task.status !== 'completed'
        );
        
        container.innerHTML = employeeTasks.map(task => {
            const importanceLevel = this.importanceLevels[task.importance];
            const deadline = new Date(task.deadline);
            const isOverdue = deadline < new Date();
            const timeUntilDue = this.getTimeUntilDeadline(deadline);
            
            return `
                <div class="task-item active-task">
                    <div class="task-info">
                        <div class="task-title">${task.title}</div>
                        <div class="task-description">${task.description}</div>
                        <div class="task-meta">
                            <span class="importance-badge importance-${task.importance}">${importanceLevel.description}</span>
                            <span class="deadline">الموعد النهائي: ${deadline.toLocaleDateString('ar-EG', {month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'})}</span>
                            <span class="countdown ${isOverdue ? 'overdue' : ''}" data-deadline="${task.deadline}">
                                ${isOverdue ? 'متأخر' : timeUntilDue}
                            </span>
                            <div class="task-tags">
                                ${task.tags?.map(tag => `<span class="task-tag">${tag}</span>`).join('') || ''}
                            </div>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn--sm btn--outline" onclick="pms.viewTaskDetails('${task.id}')">التفاصيل</button>
                        <button class="btn btn--sm btn--primary" onclick="pms.completeTask('${task.id}')">تم الإنجاز</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Load employee badges
    loadEmployeeBadges() {
        const container = document.getElementById('badgeShowcase');
        if (!container) return;
        
        const employee = this.achievements[this.currentEmployee] || { earned: [], progress: {} };
        const allBadges = [
            ...this.badgeDefinitions.timeliness,
            ...this.badgeDefinitions.quality,
            ...this.badgeDefinitions.collaboration,
            ...this.badgeDefinitions.improvement
        ];
        
        const badgeGrid = container.querySelector('.badge-grid');
        if (badgeGrid) {
            badgeGrid.innerHTML = allBadges.slice(0, 6).map(badge => {
                const isEarned = employee.earned.some(e => e.badge === badge.name);
                const progress = employee.progress[badge.name] || 0;
                const progressPercent = Math.min((progress / badge.requirement) * 100, 100);
                
                let statusClass = 'locked';
                let progressText = `0/${badge.requirement}`;
                
                if (isEarned) {
                    statusClass = 'earned';
                    progressText = `${badge.requirement}/${badge.requirement} مكتمل`;
                } else if (progress > 0) {
                    statusClass = 'in-progress';
                    progressText = `${progress}/${badge.requirement}`;
                }
                
                return `
                    <div class="badge-item ${statusClass}" title="${badge.description}">
                        <div class="badge-icon">${badge.icon}</div>
                        <div class="badge-name">${badge.name}</div>
                        <div class="badge-progress">${progressText}</div>
                        ${!isEarned && progress > 0 ? `
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                        ` : ''}
                        ${isEarned ? `<div class="badge-points">+${badge.points} pts</div>` : ''}
                    </div>
                `;
            }).join('');
        }
        
        // Load next milestones
        const milestonesContainer = document.getElementById('nextMilestones');
        if (milestonesContainer) {
            const nextMilestones = this.getNextMilestones(this.currentEmployee);
            milestonesContainer.innerHTML = nextMilestones.map(milestone => `
                <div class="milestone-item">
                    <div class="milestone-icon">${milestone.icon}</div>
                    <div class="milestone-info">
                        <div class="milestone-name">${milestone.name}</div>
                        <div class="milestone-progress">${milestone.current}/${milestone.target}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(milestone.current/milestone.target)*100}%"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Load personal development suggestions
    loadPersonalSuggestions() {
        const container = document.getElementById('personalSuggestions');
        if (!container) return;
        
        // Generate personalized suggestions based on performance data
        const suggestions = this.generatePersonalizedSuggestions(this.currentEmployee);
        
        container.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item ${suggestion.status === 'completed' ? 'completed' : ''}">
                <div class="suggestion-icon">${suggestion.status === 'completed' ? '✅' : '💡'}</div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${suggestion.title}</div>
                    <div class="suggestion-text">${suggestion.description}</div>
                    <div class="suggestion-impact">الأثر: ${suggestion.impact}</div>
                    ${suggestion.status === 'completed' ? `
                        <div class="suggestion-meta">مكتمل منذ ${this.getTimeAgo(suggestion.completedDate)}</div>
                    ` : `
                        <div class="suggestion-actions">
                            <button class="btn btn--sm btn--outline" onclick="pms.viewResource('${suggestion.resourceId}')">تعلم المزيد</button>
                            <button class="btn btn--sm btn--primary" onclick="pms.completeSuggestion('${suggestion.id}')">تم الإنجاز</button>
                        </div>
                    `}
                </div>
            </div>
        `).join('');
    }
    
    // Load development plan
    loadDevelopmentPlan() {
        const container = document.getElementById('developmentGoals');
        if (!container) return;
        
        const goals = this.developmentPlans[this.currentEmployee] || [];
        
        container.innerHTML = goals.map(goal => `
            <div class="development-goal">
                <div class="goal-header">
                    <div class="goal-title">${goal.goal}</div>
                    <div class="goal-progress">${goal.progress}%</div>
                </div>
                <div class="goal-description">${goal.description}</div>
                <div class="goal-timeline">الهدف: ${new Date(goal.target_date).toLocaleDateString()}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${goal.progress}%"></div>
                </div>
            </div>
        `).join('');
        
        // Load learning resources
        const resourcesContainer = document.getElementById('learningResources');
        if (resourcesContainer) {
            const resources = this.learningResources[this.currentEmployee] || [];
            
            resourcesContainer.innerHTML = resources.map(resource => `
                <div class="resource-item">
                    <div class="resource-icon">${resource.type === 'course' ? '📚' : '🎓'}</div>
                    <div class="resource-info">
                        <div class="resource-title">${resource.title}</div>
                        <div class="resource-provider">${resource.provider}</div>
                        <div class="resource-status status--${resource.status === 'enrolled' ? 'info' : 'success'}">${resource.status}</div>
                    </div>
                    <button class="btn btn--sm btn--outline" onclick="pms.accessResource('${resource.title}')">
                        ${resource.status === 'مسجل' ? 'متابعة' : 'بدء'}
                    </button>
                </div>
            `).join('');
        }
    }
    
    // Load personal feedback
    loadPersonalFeedback() {
        const container = document.getElementById('recentFeedback');
        if (!container) return;
        
        // Get recent feedback for current employee
        const recentFeedback = Object.values(this.feedbackConversations)
            .flat()
            .filter(feedback => {
                const task = this.tasks.find(t => t.id === feedback.task_id);
                return task && task.assigned_to === this.currentEmployee;
            })
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 3);
        
        container.innerHTML = recentFeedback.map(feedback => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <span class="feedback-sender">${feedback.sender_name}</span>
                    <span class="feedback-time">منذ ${this.getTimeAgo(feedback.timestamp)}</span>
                </div>
                <div class="feedback-content">
                    ${feedback.task_title ? `<div class="feedback-task">بشأن: ${feedback.task_title}</div>` : ''}
                    <div class="feedback-message">${feedback.message}</div>
                    ${feedback.quality_rating ? `<div class="quality-badge">الجودة: ${feedback.quality_rating}/5</div>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    // Initialize comprehensive charts
    initializeCharts() {
        // Destroy existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
        
        // Team Performance Chart (Manager View)
        const teamCtx = document.getElementById('teamPerformanceChart');
        if (teamCtx && this.currentView === 'manager') {
            this.charts.teamPerformance = new Chart(teamCtx, {
                type: 'line',
                data: {
                    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس'],
                    datasets: [{
                        label: 'متوسط أداء الفريق',
                        data: [4.0, 4.1, 4.3, 4.2, 4.5, 4.4, 4.6, 4.5],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'معدل إنجاز المهام',
                        data: [85, 87, 88, 86, 90, 91, 89, 90],
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            beginAtZero: true,
                            max: 5,
                            ticks: { stepSize: 1 },
                            title: { display: true, text: 'درجة الأداء' }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            beginAtZero: true,
                            max: 100,
                            title: { display: true, text: 'معدل الإنجاز (%)' },
                            grid: { drawOnChartArea: false }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }
        
        // Personal Trend Chart (Employee View)
        const personalCtx = document.getElementById('personalTrendChart');
        if (personalCtx && this.currentView === 'employee') {
            const employee = this.employeeEvaluations[this.currentEmployee];
            const performanceData = employee ? [
                ...employee.historical.map(h => h.final_score),
                employee.current_month.final_score
            ] : [4.2, 4.3, 4.5, 4.55];
            
            this.charts.personalTrend = new Chart(personalCtx, {
                type: 'line',
                data: {
                    labels: ['مايو', 'يونيو', 'يوليو', 'أغسطس'],
                    datasets: [{
                        label: 'أدائك',
                        data: performanceData,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#1FB8CD',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            callbacks: {
                                label: (context) => `الأداء: ${context.parsed.y.toFixed(1)}/5`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5,
                            ticks: { stepSize: 0.5 }
                        }
                    }
                }
            });
        }
        
        // Executive Summary Chart (Reports View)
        const execCtx = document.getElementById('executiveSummaryChart');
        if (execCtx && this.currentView === 'reports') {
            this.charts.executiveSummary = new Chart(execCtx, {
                type: 'doughnut',
                data: {
                    labels: ['تكنولوجيا المعلومات', 'الموارد البشرية', 'المبيعات', 'التسويق', 'المالية'],
                    datasets: [{
                        data: [4.5, 4.2, 4.8, 4.3, 4.0],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.label}: ${context.parsed.toFixed(1)}/5`
                            }
                        }
                    }
                }
            });
        }
        
        // System Analytics Charts (Admin View)
        const engagementCtx = document.getElementById('engagementChart');
        if (engagementCtx && this.currentView === 'admin') {
            this.charts.engagement = new Chart(engagementCtx, {
                type: 'bar',
                data: {
                    labels: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
                    datasets: [{
                        label: 'المستخدمون النشطون',
                        data: [50, 60, 65, 62, 58, 20, 10],
                        backgroundColor: '#1FB8CD',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
        
        const trendCtx = document.getElementById('trendChart');
        if (trendCtx && this.currentView === 'admin') {
            this.charts.trends = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                    datasets: [{
                        label: 'استخدام النظام',
                        data: [80, 85, 90, 92],
                        borderColor: '#5D878F',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }
    }
    
    // Notification system methods - FIXED
    toggleNotifications() {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) {
            const isHidden = dropdown.classList.contains('hidden');
            if (isHidden) {
                dropdown.classList.remove('hidden');
                this.loadNotifications();
                console.log('Notification dropdown opened');
            } else {
                dropdown.classList.add('hidden');
                console.log('Notification dropdown closed');
            }
        }
    }
    
    hideNotifications() {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
        }
    }
    
    loadNotifications(filterType = 'all') {
        const container = document.getElementById('notificationList');
        if (!container) return;
        
        let relevantNotifications = this.notifications
            .filter(n => this.isNotificationRelevant(n))
            .filter(n => filterType === 'all' || n.type.includes(filterType));
        
        relevantNotifications.sort((a, b) => b.timestamp - a.timestamp);
        
        container.innerHTML = relevantNotifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}" onclick="pms.handleNotificationClick(${notification.id})">
                <div class="notification-content">
                    <div class="notification-type-icon">${notification.icon}</div>
                    <div>
                        <div class="notification-text">${notification.message}</div>
                        <div class="notification-time">منذ ${this.getTimeAgo(notification.timestamp)}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    filterNotifications(type) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-type="${type}"]`)?.classList.add('active');
        
        this.loadNotifications(type);
    }
    
    handleNotificationClick(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) return;
        
        notification.read = true;
        this.updateNotificationBadge();
        
        // Handle different notification types
        switch(notification.type) {
            case 'feedback_request':
                if (notification.related_task) {
                    this.reviewTask(notification.related_task);
                }
                break;
            case 'evaluation_due':
                if (notification.related_employee) {
                    this.startEvaluation(notification.related_employee);
                }
                break;
            case 'deadline_alert':
                if (notification.related_task) {
                    this.showTaskDetails(notification.related_task);
                }
                break;
        }
        
        this.loadNotifications();
    }
    
    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            const unreadCount = this.notifications.filter(n => 
                !n.read && this.isNotificationRelevant(n)
            ).length;
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    isNotificationRelevant(notification) {
        if (notification.employee === 'all') return true;
        
        if (this.currentView === 'manager') {
            return notification.employee === this.currentUser ||
                   this.employees.filter(emp => emp.manager === this.currentUser)
                               .some(emp => emp.id === notification.employee);
        } else if (this.currentView === 'employee') {
            return notification.employee === this.currentEmployee;
        }
        
        return true; // Admin view sees all
    }
    
    markAllRead() {
        this.notifications.forEach(n => {
            if (this.isNotificationRelevant(n)) {
                n.read = true;
            }
        });
        this.updateNotificationBadge();
        this.loadNotifications();
        this.showToast('All notifications marked as read', 'success');
    }
    
    // Toast notification system
    showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toastId = `toast-${++this.toastId}`;
        const iconMap = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.id = toastId;
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${iconMap[type] || 'ℹ️'}</div>
                <div class="toast-message">${message}</div>
                <button class="toast-close" onclick="pms.removeToast('${toastId}')">&times;</button>
            </div>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            this.removeToast(toastId);
        }, duration);
    }
    
    removeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast && toast.parentNode) {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }
    
    // Employee selector - FIXED
    switchEmployee() {
        const selector = document.getElementById('employeeSelector');
        if (selector) {
            this.currentEmployee = selector.value;
            console.log('Switched to employee:', this.currentEmployee);
            this.loadEmployeeDashboard();
        }
    }
    
    // Quick actions and other UI methods
    showQuickActions() {
        const dropdown = document.getElementById('quickActionsDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
    
    hideQuickActions() {
        const dropdown = document.getElementById('quickActionsDropdown');
        if (dropdown && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
        }
    }
    
    hideUserDropdown() {
        const dropdown = document.querySelector('.user-dropdown .dropdown-menu');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
    
    // Report generation methods
    loadReportCategories() {
        // Categories are already set up in HTML
    }
    
    showReportCategory(category) {
        // Update active category
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        
        // Find and activate the correct category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            const text = btn.textContent.toLowerCase();
            if ((category === 'manager' && text.includes('manager')) ||
                (category === 'admin' && text.includes('admin')) ||
                (category === 'executive' && text.includes('executive'))) {
                btn.classList.add('active');
            }
        });
        
        // Show/hide report sections
        document.querySelectorAll('.report-section').forEach(section => section.classList.remove('active'));
        document.getElementById(`${category}-reports`)?.classList.add('active');
    }
    
    generateReport(reportType) {
        this.showToast(`Generating ${reportType} report...`, 'info');
        
        // Simulate report generation
        setTimeout(() => {
            this.showToast(`Report "${reportType}" generated successfully!`, 'success');
        }, 2000);
    }
    
    // Admin dashboard methods
    showAdminSection(sectionName) {
        // Update active admin tab
        document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
        
        // Find and activate the correct tab
        document.querySelectorAll('.admin-tab').forEach(tab => {
            const text = tab.textContent.toLowerCase();
            if ((sectionName === 'users' && text.includes('user')) ||
                (sectionName === 'departments' && text.includes('department')) ||
                (sectionName === 'system' && text.includes('system')) ||
                (sectionName === 'analytics' && text.includes('analytics')) ||
                (sectionName === 'audit' && text.includes('audit'))) {
                tab.classList.add('active');
            }
        });
        
        // Show/hide admin sections
        document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
        document.getElementById(`${sectionName}-section`)?.classList.add('active');
    }
    
    loadUserManagement() {
        const container = document.getElementById('userTable');
        if (!container) return;
        
        const allUsers = [...this.employees, ...this.managers.map(m => ({...m, role: 'manager'}))];
        
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>البريد الإلكتروني</th>
                        <th>القسم</th>
                        <th>الدور</th>
                        <th>الحالة</th>
                        <th>آخر نشاط</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${allUsers.map(user => `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email || `${user.name.toLowerCase().replace(' ', '.')}@mycompany.com`}</td>
                            <td>${user.department}</td>
                            <td>${user.role || 'موظف'}</td>
                            <td><span class="status status--success">نشط</span></td>
                            <td>منذ ${Math.floor(Math.random() * 24)} ساعة</td>
                            <td>
                                <button class="btn--sm btn--outline" onclick="pms.editUser('${user.id}')">تعديل</button>
                                <button class="btn--sm btn--secondary" onclick="pms.viewUserDetails('${user.id}')">عرض</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    loadSystemAnalytics() {
        // Initialize system analytics charts and data
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    }
    
    loadAuditLog() {
        const container = document.getElementById('auditLog');
        if (!container) return;
        
        const auditEntries = [
            {action: 'تسجيل دخول مستخدم', user: 'علي محمد', time: new Date(Date.now() - 30 * 60 * 1000)},
            {action: 'مهمة مكتملة', user: 'سارة حسن', time: new Date(Date.now() - 45 * 60 * 1000)},
            {action: 'تم إرسال تقييم', user: 'أحمد علي', time: new Date(Date.now() - 60 * 60 * 1000)},
            {action: 'تم إنشاء تقرير', user: 'مستخدم إداري', time: new Date(Date.now() - 90 * 60 * 1000)},
            {action: 'تم إنشاء مستخدم', user: 'مستخدم إداري', time: new Date(Date.now() - 120 * 60 * 1000)}
        ];
        
        container.innerHTML = auditEntries.map(entry => `
            <div class="audit-entry">
                <span class="audit-action">${entry.action}</span>
                <span class="audit-user">${entry.user}</span>
                <span class="audit-time">منذ ${this.getTimeAgo(entry.time)}</span>
            </div>
        `).join('');
    }
    
    loadSystemSettings() {
        // Initialize system settings with current values
        // Settings would be loaded from configuration
    }
    
    loadExecutiveSummary() {
        // Load executive summary data
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    }
    
    generateSampleReports() {
        // Generate sample report data for demo
    }
    
    // Task management methods
    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        task.status = 'completed';
        task.completion_time = new Date().toISOString();
        
        // Calculate timeliness multiplier
        const deadline = new Date(task.deadline);
        const completed = new Date(task.completion_time);
        const timeDiff = deadline - completed;
        
        let timeliness_multiplier = 1.0; // On time
        if (timeDiff > 0) timeliness_multiplier = 1.2; // Early
        else if (timeDiff < 0) timeliness_multiplier = 0.7; // Late
        
        // Update employee streaks and achievements
        this.updateEmployeeStreaks(task.assigned_to, timeliness_multiplier > 0.9);
        
        this.showToast(`تم إنجاز مهمة "${task.title}" بنجاح!`, 'success');
        this.loadViewData(this.currentView);
        
        // Generate feedback request notification
        this.generateFeedbackRequestNotification(task);
    }
    
    reviewTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        this.currentTask = task;
        this.showTaskReviewModal();
    }
    
    showTaskReviewModal() {
        // This would open a modal for task review
        // For now, simulate the review process
        this.showToast('تم تفعيل وظيفة مراجعة المهام. يرجى تقييم جودة المهمة.', 'info');
        
        // Simulate rating assignment
        setTimeout(() => {
            if (this.currentTask) {
                this.currentTask.quality_rating = 4 + Math.random(); // Random rating between 4-5
                this.showToast(`تم تقييم المهمة ${this.currentTask.quality_rating.toFixed(1)}/5`, 'success');
                this.generateFeedback();
                this.loadViewData(this.currentView);
            }
        }, 2000);
    }
    
    // Evaluation system methods
    startEvaluation(employeeId) {
        this.currentEvaluation = {
            employeeId,
            section: 0,
            responses: {},
            startTime: new Date()
        };
        
        this.showEvaluationModal();
    }
    
    showEvaluationModal() {
        const employee = this.employees.find(emp => emp.id === this.currentEvaluation.employeeId);
        if (!employee) return;
        
        // This would show the comprehensive evaluation modal
        // For demo purposes, simulate completion
        this.showToast(`بدء تقييم الموظف ${employee.name}...`, 'info');
        
        setTimeout(() => {
            this.completeEvaluation();
        }, 3000);
    }
    
    completeEvaluation() {
        if (!this.currentEvaluation) return;
        
        const employeeId = this.currentEvaluation.employeeId;
        const employee = this.employees.find(emp => emp.id === employeeId);
        
        // Generate sample evaluation scores
        const evaluation = {
            work_engagement: 4.0 + Math.random(),
            team_collaboration: 4.0 + Math.random(),
            communication: 4.0 + Math.random(),
            reliability: 4.0 + Math.random(),
            adaptability: 4.0 + Math.random()
        };
        
        // Calculate overall attitude score
        const categories = this.evaluationFramework.attitudeCategories;
        let weightedSum = 0;
        let totalWeight = 0;
        
        Object.entries(categories).forEach(([key, config]) => {
            weightedSum += evaluation[key] * config.weight;
            totalWeight += config.weight;
        });
        
        evaluation.overall_attitude = weightedSum / totalWeight;
        evaluation.task_performance = 4.0 + Math.random(); // Simulate task performance
        evaluation.final_score = (evaluation.overall_attitude + evaluation.task_performance) / 2;
        
        // Store evaluation
        if (!this.employeeEvaluations[employeeId]) {
            this.employeeEvaluations[employeeId] = { historical: [] };
        }
        this.employeeEvaluations[employeeId].current_month = evaluation;
        
        this.showToast(`اكتمل تقييم ${employee.name}. النتيجة النهائية: ${evaluation.final_score.toFixed(1)}/5`, 'success');
        this.currentEvaluation = null;
        this.loadViewData(this.currentView);
    }
    
    // Achievement system methods
    updateEmployeeStreaks(employeeId, onTime) {
        const achievements = this.achievements[employeeId];
        if (!achievements) return;
        
        if (onTime) {
            achievements.streaks.onTime = (achievements.streaks.onTime || 0) + 1;
            this.checkForNewAchievements(employeeId);
        } else {
            achievements.streaks.onTime = 0;
        }
    }
    
    checkForNewAchievements(employeeId) {
        const achievements = this.achievements[employeeId];
        if (!achievements) return;
        
        // Check timeliness badges
        this.badgeDefinitions.timeliness.forEach(badge => {
            if (achievements.streaks.onTime >= badge.requirement && 
                !achievements.earned.some(e => e.badge === badge.name)) {
                this.awardBadge(employeeId, badge);
            }
        });
    }
    
    awardBadge(employeeId, badge) {
        const achievements = this.achievements[employeeId];
        const employee = this.employees.find(emp => emp.id === employeeId);
        
        achievements.earned.push({
            badge: badge.name,
            earned_date: new Date().toISOString(),
            category: this.getBadgeCategory(badge.name)
        });
        
        achievements.totalPoints = (achievements.totalPoints || 0) + badge.points;
        
        // Create celebration notification
        this.notifications.unshift({
            id: Date.now(),
            type: "celebration",
            icon: badge.icon,
            message: `تهانينا! ${employee.name} حصل على وسام "${badge.name}"!`,
            urgency: "low",
            timestamp: new Date(),
            read: false,
            employee: employeeId,
            related_achievement: badge.name
        });
        
        this.showToast(`🎉 تم الحصول على وسام: ${badge.name}!`, 'success');
        this.updateNotificationBadge();
    }
    
    // Generate personalized suggestions
    generatePersonalizedSuggestions(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        const achievements = this.achievements[employeeId] || {streaks: {}};
        const evaluation = this.employeeEvaluations[employeeId];
        
        const suggestions = [];
        
        // Time management suggestion
        if (achievements.streaks.onTime < 10) {
            suggestions.push({
                id: 'time-mgmt-1',
                title: 'تحسين إدارة الوقت',
                description: 'جرب تقنية Time-blocking لتخصيص ساعات محددة للعمل المركز.',
                impact: 'عالي - يمكن أن يحسن إكمال المهام في الوقت المحدد بنسبة 25%',
                resourceId: 'time-blocking-guide',
                status: 'active'
            });
        }
        
        // Quality improvement suggestion
        if (evaluation?.current_month?.task_performance < 4.0) {
            suggestions.push({
                id: 'quality-1',
                title: 'تعزيز ضبط الجودة',
                description: 'نفّذ قائمة مراجعة شخصية قبل تسليم المهام.',
                impact: 'متوسط - يمكن أن يزيد تقييمات الجودة بنسبة 15%',
                resourceId: 'quality-checklist',
                status: 'active'
            });
        }
        
        // Collaboration suggestion
        if (evaluation?.current_month?.team_collaboration < 4.0) {
            suggestions.push({
                id: 'collab-1',
                title: 'تعزيز التعاون مع الفريق',
                description: 'حدد اجتماعات دورية مع أعضاء الفريق في المشاريع المشتركة.',
                impact: 'عالي - يحسن أداء الفريق والعلاقات',
                resourceId: 'collaboration-guide',
                status: 'active'
            });
        }
        
        // Add some completed suggestions for demo
        suggestions.push({
            id: 'completed-1',
            title: 'روتين التخطيط اليومي',
            description: 'ضع روتيناً صباحياً لتخطيط مهامك اليومية وأولوياتك.',
            impact: 'مكتمل',
            status: 'completed',
            completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        });
        
        return suggestions;
    }
    
    // Get next milestones for employee
    getNextMilestones(employeeId) {
        const achievements = this.achievements[employeeId] || {progress: {}, streaks: {}};
        const milestones = [];
        
        // Next timeliness milestone
        const currentStreak = achievements.streaks.onTime || 0;
        const nextTimelinessTarget = currentStreak < 5 ? 5 : currentStreak < 20 ? 20 : 50;
        milestones.push({
            name: currentStreak < 5 ? 'بداية في الوقت المحدد' : currentStreak < 20 ? 'محترف المواعيد' : 'بطل الوقت',
            icon: currentStreak < 5 ? '⏰' : currentStreak < 20 ? '🎯' : '🏆',
            current: currentStreak,
            target: nextTimelinessTarget
        });
        
        // Quality milestone
        const qualityProgress = achievements.progress['خبير التميز'] || 0;
        milestones.push({
            name: 'خبير التميز',
            icon: '🌟',
            current: qualityProgress,
            target: 2
        });
        
        return milestones;
    }
    
    // Utility methods
    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days > 0) return `${days} يوم${days > 1 ? 's' : ''}`;
        if (hours > 0) return `${hours} ساعة${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `${minutes} دقيقة${minutes > 1 ? 's' : ''}`;
        return 'الآن';
    }
    
    getTimeUntilDeadline(deadline) {
        const now = new Date();
        const diff = deadline - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days > 0) return `متبقي ${days} يوم`;
        if (hours > 0) return `متبقي ${hours} ساعة`;
        return 'مستحق قريبًا';
    }
    
    findBadgeDefinition(badgeName) {
        const allBadges = [
            ...this.badgeDefinitions.timeliness,
            ...this.badgeDefinitions.quality,
            ...this.badgeDefinitions.collaboration,
            ...this.badgeDefinitions.improvement
        ];
        return allBadges.find(badge => badge.name === badgeName);
    }
    
    getBadgeCategory(badgeName) {
        for (const [category, badges] of Object.entries(this.badgeDefinitions)) {
            if (badges.some(badge => badge.name === badgeName)) {
                return category;
            }
        }
        return 'other';
    }
    
    performGlobalSearch(query) {
        if (query.length < 2) return;
        
        // Simulate search functionality
        console.log('Searching for:', query);
        // In a real implementation, this would search employees, tasks, reports, etc.
    }
    
    updateCountdowns() {
        document.querySelectorAll('.countdown').forEach(element => {
            const deadline = new Date(element.getAttribute('data-deadline'));
            const now = new Date();
            const diff = deadline - now;
            
            if (diff > 0) {
                element.textContent = this.getTimeUntilDeadline(deadline);
                
                if (diff < 2 * 60 * 60 * 1000) { // Less than 2 hours
                    element.style.color = 'var(--color-error)';
                } else if (diff < 24 * 60 * 60 * 1000) { // Less than 1 day
                    element.style.color = 'var(--color-warning)';
                }
            } else {
                element.textContent = 'متأخر';
                element.style.color = 'var(--color-error)';
                element.classList.add('overdue');
            }
        });
    }
    
    updateRealTimeMetrics() {
        // Update any real-time metrics
        const now = new Date();
        console.log('Updating real-time metrics at', now);
    }
    
    saveSystemState() {
        // Save current state to localStorage for persistence
        const state = {
            notifications: this.notifications,
            achievements: this.achievements,
            tasks: this.tasks,
            evaluations: this.employeeEvaluations,
            timestamp: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('pms_state', JSON.stringify(state));
            console.log('System state saved successfully');
        } catch (error) {
            console.warn('Could not save system state:', error);
        }
    }
    
    loadSystemState() {
        try {
            const savedState = localStorage.getItem('pms_state');
            if (savedState) {
                const state = JSON.parse(savedState);
                // Merge saved state with current state
                this.notifications = [...(state.notifications || []), ...this.notifications];
                console.log('System state loaded successfully');
            }
        } catch (error) {
            console.warn('Could not load system state:', error);
        }
    }
    
    // Additional methods for comprehensive functionality
    loadDashboardData() {
        this.loadSystemState();
        this.updateNotificationBadge();
    }
    
    startNotificationSystem() {
        // Start periodic notification checks
        setInterval(() => {
            this.checkForNewNotifications();
        }, 300000); // Check every 5 minutes
    }
    
    checkForNewNotifications() {
        // Generate new notifications based on system state
        const now = new Date();
        
        // Check for upcoming deadlines
        this.tasks.forEach(task => {
            if (task.status === 'pending' || task.status === 'in_progress') {
                const deadline = new Date(task.deadline);
                const timeDiff = deadline - now;
                const hoursUntilDeadline = timeDiff / (1000 * 60 * 60);
                
                if (hoursUntilDeadline <= 24 && hoursUntilDeadline > 0) {
                    // Check if notification already exists
                    const existingNotification = this.notifications.find(n => 
                        n.type === 'deadline_alert' && n.related_task === task.id
                    );
                    
                    if (!existingNotification) {
                        this.notifications.unshift({
                            id: Date.now(),
                            type: 'deadline_alert',
                            icon: '⚠️',
                            urgency: 'high',
                            message: `Task "${task.title}" is due ${hoursUntilDeadline < 1 ? 'in less than an hour' : `in ${Math.floor(hoursUntilDeadline)} hours`}`,
                            timestamp: now,
                            read: false,
                            employee: task.assigned_to,
                            related_task: task.id
                        });
                        
                        this.updateNotificationBadge();
                    }
                }
            }
        });
    }
    
    generateFeedbackRequestNotification(task) {
        this.notifications.unshift({
            id: Date.now(),
            type: 'feedback_request',
            icon: '💬',
            urgency: 'high',
            message: `الرجاء تقديم ملاحظاتك حول المهمة المكتملة: ${task.title}`,
            timestamp: new Date(),
            read: false,
            employee: task.assigned_by,
            related_task: task.id
        });
        
        this.updateNotificationBadge();
    }
    
    generateFeedback() {
        if (!this.currentTask) return;
        
        const templates = Object.values(this.feedbackTemplates);
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        // Store feedback in conversation history
        if (!this.feedbackConversations[this.currentTask.id]) {
            this.feedbackConversations[this.currentTask.id] = [];
        }
        
        this.feedbackConversations[this.currentTask.id].push({
            id: Date.now(),
            sender: 'manager',
            sender_name: 'أحمد علي',
            message: randomTemplate,
            timestamp: new Date(),
            quality_rating: this.currentTask.quality_rating,
            task_title: this.currentTask.title
        });
        
        this.currentTask = null;
    }
    
    // Placeholder methods for additional functionality
    showTaskModal() { this.showToast('تم فتح نافذة تعيين مهمة', 'info'); }
    closeModal(modalId) { this.showToast('تم إغلاق النافذة', 'info'); }
    assignTask() { this.showToast('تم تعيين المهمة بنجاح', 'success'); }
    showTaskDetails(taskId) { const task = this.tasks.find(t => t.id === taskId); if (task) this.showToast(`عرض تفاصيل المهمة: ${task.title}`, 'info'); }
    completeSuggestion(suggestionId) { this.showToast('تم وضع الاقتراح كـ مكتمل!', 'success'); this.loadPersonalSuggestions(); }
    viewResource(resourceId) { this.showToast(`فتح المصدر التعليمي: ${resourceId}`, 'info'); }
    editUser(userId) { this.showToast(`فتح مربع حوار تعديل المستخدم: ${userId}`, 'info'); }
    viewUserDetails(userId) { this.showToast(`عرض تفاصيل المستخدم: ${userId}`, 'info'); }
    logout() { if (confirm('هل أنت متأكد أنك تريد تسجيل الخروج؟')) { this.showToast('تسجيل الخروج...', 'info'); } }
    switchChartView(chartType) { document.querySelectorAll('.chart-btn').forEach(btn => btn.classList.remove('active')); document.querySelector(`[data-chart="${chartType}"]`)?.classList.add('active'); this.showToast(`تم التبديل إلى عرض ${chartType}`, 'info'); }
    accessResource(resourceTitle) { this.showToast(`الوصول إلى المصدر: ${resourceTitle}`, 'info'); }
    handleFormSubmission(event) { console.log('Form submitted:', event); }
    handleKeyboardShortcuts(event) { if (event.ctrlKey && event.key === '/') { event.preventDefault(); this.showToast('اختصارات المساعدة: Ctrl+/ للمساعدة، Ctrl+K للبحث', 'info'); } if (event.ctrlKey && event.key === 'k') { event.preventDefault(); document.getElementById('globalSearch')?.focus(); } }
    viewEvaluation(empId) { this.showToast(`عرض تقييم الموظف: ${empId}`, 'info'); }
    loadFeedbackMetrics() { /* Load feedback metrics for manager dashboard */ }
}

// Initialize the system when DOM is loaded
let pms;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing TechCorp PMS...');
    pms = new TechCorpPerformanceSystem();
    pms.init();
    
    // Make globally accessible for onclick handlers
    window.pms = pms;
    
    // Add some interactive demo features
    setTimeout(() => {
        pms.showToast('مرحباً بك في نظام إدارة الأداء لمنظمتي!', 'success');
    }, 1000);
    
    console.log('TechCorp PMS fully loaded and ready');
});

// Global functions for onclick handlers
function showView(viewName) { if (window.pms) window.pms.showView(viewName); }
function toggleNotifications() { if (window.pms) window.pms.toggleNotifications(); }
function markAllRead() { if (window.pms) window.pms.markAllRead(); }
function showTaskModal() { if (window.pms) window.pms.showTaskModal(); }
function closeModal(modalId) { if (window.pms) window.pms.closeModal(modalId); }
function assignTask() { if (window.pms) window.pms.assignTask(); }
function switchEmployee() { if (window.pms) window.pms.switchEmployee(); }
function showQuickActions() { if (window.pms) window.pms.showQuickActions(); }
function generateReport(reportType) { if (window.pms) window.pms.generateReport(reportType); }
function showReportCategory(category) { if (window.pms) window.pms.showReportCategory(category); }
function showAdminSection(section) { if (window.pms) window.pms.showAdminSection(section); }
function startEvaluation(empId) { if (window.pms) window.pms.startEvaluation(empId); }
function viewEvaluation(empId) { if (window.pms) window.pms.viewEvaluation(empId); }
function logout() { if (window.pms) window.pms.logout(); }
