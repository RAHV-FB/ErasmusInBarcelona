// ============================================================
// THE BARCELONA COURSE GROUPS — the organisation's own catalogue
// for this site, defined by the owner in August 2026.
//
// Nine groups, each with its own page at /courses/<slug>/ and two
// to five courses inside. The groups follow where European school
// development is heading — digital competence and AI literacy,
// wellbeing, the green transition, inclusion, democratic values,
// and language competence — so a KA1 application can name a course
// that matches its development plan.
//
// What lives here: the groups, their courses, and the words for
// both. What does not: fees, schedule, booking terms, dates and
// venues, which come from site-data.js and are rendered by the
// template. Never restate one of those facts in this file.
//
// `image` (on a group and on each course) names an entry in
// site-data's `images`. The photographs are the owner's
// Images-Erasmus delivery, processed by tools/build-images.mjs;
// files named for a page went to that page, the rest were placed
// by subject.
//
// `dateCourses` lists the DATES-SPAINBCN sheet's own course labels
// that belong to the group, so "Next in Barcelona" can show the
// scheduled weeks without inventing a mapping anywhere else.
// ============================================================

export const courseGroups = [
  {
    slug: 'ai-literacy',
    title: 'AI literacy and digital tools for teachers',
    navLabel: 'AI literacy and digital tools',
    short: 'Understanding AI, choosing digital tools, and using both deliberately.',
    lede: 'What artificial intelligence changes for schools, and the digital habits that make everyday teaching lighter.',
    welcome: 'These courses are for teachers and school staff who want to understand AI well enough '
      + 'to use it deliberately — and to explain their choices to colleagues, students and families.',
    method: 'Sessions move between demonstration, guided practice on your own teaching materials, '
      + 'and discussion of what deserves a place in your school.',
    language: 'English',
    image: 'blueScreenClassroom',
    dateCourses: ['AI & ICT'],
    desc: 'One-week courses in Barcelona on AI literacy and digital competence for teachers and school staff, from first principles to advanced classroom use.',
    courses: [
      {
        id: 'ai-literacy-for-educators',
        image: 'aiLaptopsClassroom',
        title: 'AI literacy for educators',
        level: 'Introductory',
        audience: 'Teaching and non-teaching staff at any level of education. No technical background needed.',
        summary: 'A working understanding of what AI systems do, what they get wrong, and what that '
          + 'means for teaching. The week builds the vocabulary and the judgement to decide where AI '
          + 'belongs in your school — and where it does not.',
        objectives: [
          'Understand, in plain terms, how AI systems produce their results and why they fail',
          'Weigh what AI offers and what it risks for teaching, assessment and school administration',
          'Relate your school’s practice to current European guidance on AI in education',
        ],
        outcomes: [
          'Explain to a colleague or a class how AI-generated material comes to be, and read it critically',
          'Draft workable classroom rules for acceptable use',
          'Judge where AI genuinely helps your work and where it quietly harms it',
          'Follow developments after the course without depending on headlines',
        ],
      },
      {
        id: 'digital-tools-everyday-teaching',
        image: 'aiWhiteboard',
        title: 'Digital tools for everyday teaching',
        level: 'Introductory',
        audience: 'Teachers and support staff who want their digital work organised rather than multiplied.',
        summary: 'A practical week on the digital side of ordinary teaching: preparing materials, '
          + 'organising classes, giving feedback and keeping the workload manageable. The aim is a '
          + 'smaller, better toolkit — not a longer list.',
        objectives: [
          'Build a simple digital workflow for planning, materials and feedback',
          'Evaluate a tool before adopting it: privacy, accessibility and the time it really costs',
          'Get more from what your school already uses before adding anything new',
        ],
        outcomes: [
          'Organise planning, materials and class administration digitally, in one coherent way',
          'Accept or reject a new tool on clear criteria',
          'Produce digital materials your students can all access',
          'Keep the workflow going at home, because it fits how you already work',
        ],
      },
      {
        id: 'ai-planning-assessment-feedback',
        image: 'aiWhiteboardPair',
        title: 'AI for planning, assessment and feedback',
        level: 'Advanced',
        audience: 'Teachers already comfortable with digital work who want structured, defensible AI practice.',
        summary: 'For teachers who already work digitally and want to use AI systematically: lesson '
          + 'planning, differentiated materials and feedback, with clear boundaries on quality, '
          + 'authorship and academic integrity.',
        objectives: [
          'Integrate AI into planning and materials production while keeping your own judgement in charge',
          'Design tasks and assessment that stay meaningful when students have AI too',
          'Set boundaries you can defend to students, families and inspection alike',
        ],
        outcomes: [
          'Produce differentiated materials in a fraction of the usual time',
          'Design AI-aware assignments with criteria that still measure learning',
          'Run a feedback routine that is faster and more consistent than before',
          'Lead the conversation in your school instead of reacting to it',
        ],
      },
    ],
  },

  {
    slug: 'wellbeing',
    title: 'Wellbeing at school',
    navLabel: 'Wellbeing at school',
    short: 'Wellbeing for the people who teach, and for the classrooms they run.',
    lede: 'Teacher wellbeing and student wellbeing, treated as professional skills rather than luck.',
    welcome: 'A school works when the people in it do. These courses take wellbeing seriously as '
      + 'something that can be learned, practised, and carried home to a whole school.',
    method: 'The week alternates short theory with practice you do yourself, because a technique '
      + 'you have only heard about is not yet yours.',
    language: 'English',
    image: 'yogaStudio',
    dateCourses: ['Mindfulness in the classroom'],
    desc: 'One-week courses in Barcelona on teacher wellbeing, student mental health and mindfulness for schools, for teaching and non-teaching staff.',
    courses: [
      {
        id: 'teacher-wellbeing-stress',
        image: 'parkActivity',
        title: 'Teacher wellbeing and stress management',
        level: 'All levels',
        audience: 'Anyone who works in a school and feels the job’s weight — teachers, leaders, support staff.',
        summary: 'The week works on the pressures of the job itself: workload, energy, recovery, and '
          + 'getting back the parts of teaching that made it worth choosing.',
        objectives: [
          'Recognise your own stress patterns and the early signs of overload',
          'Practise techniques that fit inside a real school day, not an ideal one',
          'Plan workload and boundaries you can actually hold once term starts',
        ],
        outcomes: [
          'Leave with a personal wellbeing plan you wrote for your own circumstances',
          'Use short routines that release tension during the working day',
          'Talk about workload with colleagues and leadership constructively',
          'Notice the warning signs — in yourself and in the colleague next door',
        ],
      },
      {
        id: 'student-wellbeing-mental-health',
        image: 'puppetsWorkshop',
        title: 'Student wellbeing and mental health in the classroom',
        level: 'All levels',
        audience: 'Class teachers, tutors, counsellors and the support staff students actually talk to.',
        summary: 'What a teacher can genuinely do about student wellbeing: notice earlier, respond '
          + 'within a teacher’s role, and pass on well what needs passing on.',
        objectives: [
          'Recognise signs of distress, and know where a teacher’s responsibility ends',
          'Build classroom routines that give students safety and belonging',
          'Work with families and specialists instead of alongside them',
        ],
        outcomes: [
          'Respond to an early concern with confidence instead of avoidance',
          'Run a classroom whose daily habits support wellbeing without announcing it',
          'Refer a student well: to whom, when, and with what said to the family',
          'Contribute to your school’s wellbeing plan with something concrete',
        ],
      },
      {
        id: 'mindfulness-for-schools',
        image: 'mindfulnessStudio',
        title: 'Mindfulness for schools',
        level: 'Introductory',
        audience: 'School staff curious about mindfulness for themselves first, their classrooms second.',
        summary: 'A grounded introduction: the practice itself before the classroom uses. Everything '
          + 'taught fits an ordinary school day and needs no special room, equipment or beliefs.',
        objectives: [
          'Establish a short personal practice and understand what it is for',
          'Adapt brief practices for classroom use across different ages',
          'Separate what the evidence supports from what fashion claims',
        ],
        outcomes: [
          'Lead a short exercise with a class, calmly and without ceremony',
          'Steady your own attention in the moments that used to run away with you',
          'Choose practices appropriate to the age in front of you',
          'Say honestly what mindfulness can carry in a school — and what it cannot',
        ],
      },
    ],
  },

  {
    slug: 'outdoor-sustainability',
    title: 'Outdoor learning and sustainability',
    navLabel: 'Outdoor learning and sustainability',
    short: 'Teaching beyond the classroom, and teaching for the green transition.',
    lede: 'Learning that happens outdoors, and teaching that takes sustainability seriously.',
    welcome: 'Barcelona is a good city to learn outdoors in: parks, coastline, and streets that '
      + 'reward attention. These courses use that setting to make outdoor teaching and education '
      + 'for sustainability part of ordinary school practice.',
    method: 'Part of every course happens outside, because outdoor teaching is learned outdoors; '
      + 'what you practise here is what you will run at home.',
    language: 'English',
    image: 'montjuicView',
    dateCourses: [],
    desc: 'One-week courses in Barcelona on outdoor learning, education for sustainability and place-based teaching, practised in the city itself.',
    courses: [
      {
        id: 'outdoor-learning-beyond-classroom',
        image: 'climbingWall',
        title: 'Outdoor learning: teaching beyond the classroom',
        level: 'Introductory',
        audience: 'Teachers of any subject — outdoor learning is not only for the sciences.',
        summary: 'How to plan, run and assess learning outside the classroom: safely, with a clear '
          + 'purpose, and in ways a timetable and a head teacher can live with.',
        objectives: [
          'Plan outdoor sessions with real learning aims, not outings with a worksheet',
          'Manage groups, safety and logistics so the learning stays in front',
          'Connect outdoor work to your curriculum and your assessment',
        ],
        outcomes: [
          'Plan an outdoor teaching sequence for your own subject',
          'Run a session with structure students can follow away from desks',
          'Handle risk assessment proportionately instead of fearfully',
          'Make the case for outdoor learning to colleagues and leadership',
        ],
      },
      {
        id: 'education-for-sustainability',
        image: 'wetlandWalk',
        title: 'Education for sustainability',
        level: 'All levels',
        audience: 'Teachers and school staff bringing the green transition into subjects and school life.',
        summary: 'Sustainability treated as a teaching competence rather than a topic: what to teach, '
          + 'how to keep it honest and hopeful at once, and how the school itself becomes part of the lesson.',
        objectives: [
          'Build sustainability into the subjects you already teach',
          'Work with green competences appropriate to each age',
          'Address the difficult emotions around climate without feeding them or denying them',
        ],
        outcomes: [
          'Map curriculum links between your subject and sustainability',
          'Teach climate-related content that is neither alarmist nor complacent',
          'Involve students in the school’s own habits — energy, waste, consumption',
          'Contribute to whole-school sustainability planning',
        ],
      },
      {
        id: 'barcelona-as-a-classroom',
        image: 'gothicCourtyard',
        title: 'Barcelona as a classroom: place-based learning',
        level: 'All levels',
        audience: 'Teachers who want a transferable method, with Barcelona as the worked example.',
        summary: 'A week that treats the city as teaching material: how a street, a market or a '
          + 'shoreline becomes a site for learning, and how to build the same approach around the '
          + 'place your school stands in.',
        objectives: [
          'Design learning around real places and what they hold',
          'Structure observation and inquiry so fieldwork produces knowledge',
          'Transfer the method from Barcelona to your own town',
        ],
        outcomes: [
          'Design a place-based unit for where you live and teach',
          'Structure fieldwork so the learning is visible and assessable',
          'Use local institutions — museums, markets, archives — as partners',
          'Assess work made outside the classroom fairly',
        ],
      },
    ],
  },

  {
    slug: 'inclusive-education',
    title: 'Inclusive education: SEN, UDL and neurodiversity',
    navLabel: 'Inclusive education',
    short: 'SEN in the mainstream, Universal Design for Learning, and neurodiversity.',
    lede: 'Classrooms that work for the students they actually contain.',
    welcome: 'Inclusion is a set of skills before it is a policy. These courses give class teachers, '
      + 'specialists and support staff the practical part: recognising needs, planning for variety, '
      + 'and adjusting without lowering ambition.',
    method: 'You work throughout on your own materials and your own classes, so what you take home '
      + 'is your teaching adjusted, not a folder of someone else’s.',
    language: 'English',
    image: 'senClassroom',
    dateCourses: [],
    desc: 'One-week courses in Barcelona on special educational needs, Universal Design for Learning and neurodiversity, for mainstream teachers and support staff.',
    courses: [
      {
        id: 'sen-mainstream-classroom',
        image: 'senCertificates',
        title: 'Special educational needs in the mainstream classroom',
        level: 'Introductory',
        audience: 'Class and subject teachers who are not specialists but teach students with SEN every day.',
        summary: 'The non-specialist’s week: recognising common needs as they actually appear in '
          + 'class, adjusting teaching without lowering aims, and cooperating well with the '
          + 'specialists and families around each student.',
        objectives: [
          'Recognise how common needs present in an ordinary lesson',
          'Adjust materials, instruction and assessment while keeping expectations high',
          'Work effectively with support staff, specialists and families',
        ],
        outcomes: [
          'Adapt a lesson for specific needs without writing a second lesson',
          'Set expectations that are both ambitious and fair',
          'Contribute usefully to individual education plans',
          'Know where the teacher’s role ends and the specialist’s begins',
        ],
      },
      {
        id: 'udl-in-practice',
        image: 'cardWorktable',
        title: 'Universal Design for Learning in practice',
        level: 'All levels',
        audience: 'Teachers and coordinators who would rather plan for variety than patch for it.',
        summary: 'Planning that assumes variety from the start, so fewer students need rescuing '
          + 'later. The week turns the principles of Universal Design for Learning into ordinary '
          + 'planning habits.',
        objectives: [
          'Plan more than one way into, through and out of the same learning',
          'Design materials that are accessible first, so adaptation becomes rare',
          'Evaluate your existing units for the barriers built into them',
        ],
        outcomes: [
          'Redesign a unit of your own along UDL lines',
          'Spot the barriers in a worksheet, a task or an assessment at a glance',
          'Offer choice in how students work and show learning, without losing rigour',
          'Explain UDL to colleagues in ten minutes that make them want it',
        ],
      },
      {
        id: 'understanding-neurodiversity',
        image: 'officeClassroom',
        title: 'Understanding neurodiversity at school',
        level: 'All levels',
        audience: 'Teachers, tutors and support staff at any stage, primary through VET and adult education.',
        summary: 'A practical week on neurodevelopmental differences: how they show up in class, '
          + 'what actually helps, and how a school moves from managing difference to planning for it.',
        objectives: [
          'Understand current thinking on neurodevelopmental differences and what it changes',
          'Adjust environment, instruction and routine so more students can work',
          'Involve students themselves in finding what works for them',
        ],
        outcomes: [
          'Read behaviour as information rather than defiance',
          'Make low-cost adjustments that help the diagnosed and undiagnosed alike',
          'Plan lessons that offer predictability and flexibility at once',
          'Talk with students and families in ways that are respectful and useful',
        ],
      },
    ],
  },

  {
    slug: 'classroom-management',
    title: 'Positive classroom management and conflict resolution',
    navLabel: 'Classroom management',
    short: 'Order built on relationships, and repair when prevention was not enough.',
    lede: 'Calm, working classrooms — built on relationships and routine, recovered through repair.',
    welcome: 'Management is not the opposite of warmth; done well it is made of it. These courses '
      + 'cover the prevention that makes most trouble unnecessary and the resolution for the rest.',
    method: 'Cases come from the participants: the group works on real situations from real '
      + 'classrooms, including yours if you bring one.',
    language: 'English',
    image: 'cardWorkshop',
    dateCourses: ['Integration and classroom management'],
    desc: 'One-week courses in Barcelona on positive classroom management, conflict resolution and restorative practice, and classroom climate.',
    courses: [
      {
        id: 'positive-management-foundations',
        image: 'whiteboardGroup',
        title: 'Positive classroom management, foundations',
        level: 'Introductory',
        audience: 'Teachers at any stage who want their classroom order rebuilt on firmer ground.',
        summary: 'The base layer of orderly, warm classrooms: relationships, routines, and responses '
          + 'that prevent most trouble before it starts.',
        objectives: [
          'Establish routines and expectations that hold without constant enforcement',
          'Respond to low-level disruption early and without escalation',
          'Build the relationships that make authority acceptable',
        ],
        outcomes: [
          'Take home a management plan written for your own classes',
          'Respond consistently, with responses graded to the behaviour',
          'Recover a lesson that is going wrong without losing the room',
          'Spend less of your lesson on order and more of it on teaching',
        ],
      },
      {
        id: 'conflict-resolution-restorative',
        image: 'guidedActivity',
        title: 'Conflict resolution and restorative practice',
        level: 'All levels',
        audience: 'Teachers, tutors and leadership handling conflict between students, or with them.',
        summary: 'What to do when prevention was not enough: de-escalating conflict, repairing harm, '
          + 'and keeping the relationships that have to continue on Monday morning.',
        objectives: [
          'De-escalate conflict between students, and between student and teacher',
          'Run restorative conversations properly, not as a soft word for punishment',
          'Judge which conflicts need which response — and which need referring',
        ],
        outcomes: [
          'Structure a restorative conversation and hold it steady',
          'De-escalate a live incident with your own composure intact',
          'Involve a class in repairing its own climate after conflict',
          'Know the cases that belong with leadership or outside help',
        ],
      },
      {
        id: 'motivation-behaviour-climate',
        image: 'largeClass',
        title: 'Motivation, behaviour and classroom climate',
        level: 'Advanced',
        audience: 'Experienced teachers, mentors and coordinators working beyond incident response.',
        summary: 'The slower work behind behaviour: motivation, group dynamics, and the climate a '
          + 'class settles into over a term. For teachers whose basics hold and who want the rest.',
        objectives: [
          'Read a group’s dynamics — and your own part in them — accurately',
          'Work on motivation itself rather than settling for compliance',
          'Plan classroom climate deliberately across a term, not a lesson',
        ],
        outcomes: [
          'Diagnose why a class behaves the way it does',
          'Adjust your teaching so it feeds motivation instead of testing patience',
          'Turn a difficult group around over weeks, with a plan you can show',
          'Mentor colleagues on management with more than anecdotes',
        ],
      },
    ],
  },

  {
    slug: 'creative-teaching',
    title: 'Creative teaching, PBL and active methodologies',
    navLabel: 'Creative teaching and PBL',
    short: 'Projects worth doing, methods that move students, creativity in every subject.',
    lede: 'Teaching where students think, talk and make — and the knowledge stays central.',
    welcome: 'Active does not mean busy. These courses are about methods that earn their time: '
      + 'project-based learning done properly, a wider repertoire of active approaches, and '
      + 'creativity treated as teachable.',
    method: 'You learn the methods by working through them yourself, then plan their use in your '
      + 'own subject before the week ends.',
    language: 'English',
    image: 'drawingStudio',
    dateCourses: [],
    desc: 'One-week courses in Barcelona on project-based learning, active methodologies and creativity across the curriculum.',
    courses: [
      {
        id: 'pbl-in-practice',
        image: 'easels',
        title: 'Project-based learning in practice',
        level: 'All levels',
        audience: 'Teachers and coordinators introducing PBL, or rescuing a version that drifted.',
        summary: 'How to run projects that are genuinely learning and not merely activity: real '
          + 'questions, visible process, results worth showing, and knowledge that survives the fun.',
        objectives: [
          'Design projects with clear learning aims and outcomes someone else can see',
          'Manage time, roles and assessment across a project’s life',
          'Keep subject knowledge central while students work actively',
        ],
        outcomes: [
          'Leave with a project plan built for your own curriculum',
          'Set checkpoints that keep long work honest',
          'Assess both process and product, fairly and visibly',
          'Start with something small enough to succeed next term',
        ],
      },
      {
        id: 'active-methodologies',
        image: 'gameTable',
        title: 'Active methodologies for engaged classrooms',
        level: 'Introductory',
        audience: 'Teachers of any subject whose classrooms listen more than they work.',
        summary: 'A working repertoire of methods that put students in motion — thinking, talking, '
          + 'making — and the judgement to know when each one earns its lesson time.',
        objectives: [
          'Widen your repertoire of active methods across subjects and ages',
          'Match method to purpose rather than to fashion',
          'Keep pace and participation up without losing depth',
        ],
        outcomes: [
          'Use several methods new to you with confidence',
          'Choose a method because of what it does, not how it looks',
          'Raise the participation of the students who usually sit it out',
          'Show a sceptical colleague what changed, with evidence from your classroom',
        ],
      },
      {
        id: 'creativity-across-curriculum',
        image: 'galleryGroup',
        title: 'Creativity across the curriculum',
        level: 'All levels',
        audience: 'Teachers of every subject — the sciences and mathematics expressly included.',
        summary: 'Creativity treated as teachable in every subject rather than a gift some students '
          + 'arrive with. The week works on tasks, constraints and feedback that make original '
          + 'thinking normal.',
        objectives: [
          'Design tasks that admit more than one good answer',
          'Use constraints to provoke thinking rather than limit it',
          'Assess creative work in ways students and parents find credible',
        ],
        outcomes: [
          'Rewrite closed tasks from your subject as open ones',
          'Run idea-generation deliberately instead of hoping for it',
          'Give feedback that makes creative work better, not just praised',
          'Defend the rigour of creative work when asked to',
        ],
      },
    ],
  },

  {
    slug: 'ethics-values',
    title: 'Ethical AI, European values and human rights',
    navLabel: 'Ethics, values and rights',
    short: 'The ethics of AI, democratic citizenship and human rights, taught through practice.',
    lede: 'The questions technology and society put to schools — and how to teach inside them.',
    welcome: 'Schools are where the next generation learns what fairness, dignity and participation '
      + 'mean in practice. These courses work on exactly that: the ethics of AI, democratic '
      + 'citizenship and human rights as everyday teaching.',
    method: 'The methods mirror the content: structured discussion, disagreement done well, and '
      + 'cases close enough to school life to matter.',
    language: 'English',
    image: 'cathedralSquare',
    dateCourses: [],
    desc: 'One-week courses in Barcelona on the ethical use of AI in education, European values and democratic citizenship, and human rights education.',
    courses: [
      {
        id: 'ethical-use-of-ai',
        image: 'aiLaptopRows',
        title: 'Ethical use of AI in education',
        level: 'All levels',
        audience: 'Teachers, coordinators and leadership setting the terms for AI in their school.',
        summary: 'The questions AI raises inside a school — fairness, privacy, authorship, '
          + 'dependence — and how to answer them in policy and in Tuesday’s lesson.',
        objectives: [
          'Reason concretely about the ethical questions AI brings into education',
          'Draft classroom and school rules that people can actually follow',
          'Teach students to question automated systems rather than obey them',
        ],
        outcomes: [
          'Run a class discussion on AI use that produces positions, not noise',
          'Contribute substantively to your school’s AI policy',
          'Assess AI-assisted student work with criteria you can defend',
          'Explain your school’s choices to families in plain language',
        ],
      },
      {
        id: 'european-values-citizenship',
        image: 'arcadeCafe',
        title: 'Teaching European values and democratic citizenship',
        level: 'All levels',
        audience: 'Teachers of any subject; tutors and coordinators carrying citizenship in the timetable.',
        summary: 'Democracy as something practised at school rather than only described: '
          + 'participation, disagreement done well, and the shared values underneath both.',
        objectives: [
          'Teach democratic values through practice as much as content',
          'Run structured discussion of controversial issues without the wheels coming off',
          'Connect citizenship to the lives students actually lead',
        ],
        outcomes: [
          'Chair disagreement students learn from',
          'Build genuine participation into how your class runs',
          'Treat European values concretely instead of ceremonially',
          'Handle the moment a hard topic arrives uninvited',
        ],
      },
      {
        id: 'human-rights-everyday-teaching',
        image: 'institutionVisit',
        title: 'Human rights education in everyday teaching',
        level: 'All levels',
        audience: 'Teachers who meet rights questions in their subject, their classroom or their corridor.',
        summary: 'How human rights show up in ordinary subjects and ordinary school life, and how '
          + 'to teach them without preaching and without emptiness.',
        objectives: [
          'Ground rights in cases students recognise from their own world',
          'Integrate rights education into the subjects already on the timetable',
          'Connect the school’s own rules and relationships to dignity and fairness',
        ],
        outcomes: [
          'Teach a rights topic through your own subject, credibly',
          'Respond well when a rights question erupts unplanned',
          'Use the school itself as the first worked example',
          'Keep nuance alive where slogans are easier',
        ],
      },
    ],
  },

  {
    slug: 'english',
    title: 'English for teachers and school staff',
    navLabel: 'English',
    short: 'Language by level, communication skills, and methodology for English teachers.',
    lede: 'English by level from A1 to C1, communication for professional life, and methodology for the people who teach it.',
    welcome: 'A week of English in an international group does what a year of good intentions at '
      + 'home does not. These courses serve staff improving their own English and teachers '
      + 'refreshing how they teach it.',
    method: 'Classes are small and spoken: you use the language all week, in class and in the city, '
      + 'and the teaching adjusts to the level in the room.',
    language: 'English',
    image: 'englishWorksheets',
    dateCourses: ['English', 'Public Speaking'],
    desc: 'One-week English courses in Barcelona: general English from A1 to C1, communication skills, and methodology for teachers of English.',
    courses: [
      {
        id: 'general-english-a1-c1',
        image: 'englishBeginners',
        title: 'General English, A1–C1',
        level: 'A1–C1, grouped by level',
        audience: 'Teachers and non-teaching staff at every level of English, beginner to advanced.',
        summary: 'A language week grouped by level and built around the situations school staff '
          + 'actually meet: classes and corridors, meetings and mobility, and daily life abroad.',
        objectives: [
          'Consolidate the grammar and vocabulary of your level, and push at its ceiling',
          'Speak every day, more than you are used to, until it stops costing effort',
          'Practise the English of school life, travel and international projects',
        ],
        outcomes: [
          'Hold conversations at your level with more confidence than you arrived with',
          'Manage in English in meetings, mobilities and everyday situations',
          'Know your level precisely, and what to work on next',
          'Take home habits that keep the language moving after the week ends',
        ],
      },
      {
        id: 'communication-skills-english',
        image: 'englishWaving',
        title: 'Communication skills in English',
        level: 'From B1',
        audience: 'Staff whose English works but whose delivery could work harder — presenters, coordinators, leadership.',
        summary: 'For people whose English is functional and whose speaking now matters: presenting, '
          + 'leading and joining meetings, and talking to a room so that it listens.',
        objectives: [
          'Structure talks and presentations that carry an audience',
          'Manage voice, pace and nerves under real conditions',
          'Hold your own in questions, discussion and disagreement in English',
        ],
        outcomes: [
          'Give a clear, structured presentation in English',
          'Speak unprepared without the panic that used to come with it',
          'Run a meeting, or make yourself count in one',
          'Represent your institution abroad comfortably',
        ],
      },
      {
        id: 'methodology-teaching-english',
        image: 'englishWordgame',
        title: 'Methodology for teaching English',
        level: 'For teachers of English',
        audience: 'Practising English teachers, primary through adult education, refreshing their craft.',
        summary: 'Current methodology for the language classroom: communicative practice, skills '
          + 'work, and the daily craft of getting a class to speak.',
        objectives: [
          'Set your practice against current methodology, and keep what stands up',
          'Design lessons where communication drives the grammar, not the reverse',
          'Assess the four skills in ways that inform the next lesson',
        ],
        outcomes: [
          'Plan lessons in which students speak more than the teacher',
          'Correct in ways that improve the language instead of interrupting it',
          'Adapt coursebook material intelligently instead of obeying it',
          'Leave with lesson formats ready for the first Monday back',
        ],
      },
    ],
  },

  {
    slug: 'spanish',
    title: 'Spanish for teachers and school staff',
    navLabel: 'Spanish',
    short: 'Language by level, communication skills, and methodology for Spanish teachers.',
    lede: 'Spanish by level from A1 to C1, communication for professional life, and methodology for the people who teach it — in the language’s own city.',
    welcome: 'Spanish learned in Barcelona keeps working after class: the market, the metro and the '
      + 'menu are all part of the course. These courses serve staff learning the language and '
      + 'teachers of Spanish refreshing their methodology.',
    method: 'Courses in this group run in Spanish, adjusted to the level in the room; the city '
      + 'provides the immersion and the classes make it stick.',
    language: 'Spanish',
    image: 'spanishSittingRoom',
    dateCourses: ['Spanish'],
    desc: 'One-week Spanish courses in Barcelona: general Spanish from A1 to C1, communication skills, and methodology for teachers of Spanish.',
    courses: [
      {
        id: 'general-spanish-a1-c1',
        image: 'spanishOfficeGroup',
        title: 'General Spanish, A1–C1',
        level: 'A1–C1, grouped by level',
        audience: 'Teachers and non-teaching staff at every level of Spanish, beginner to advanced.',
        summary: 'A language week grouped by level, taught in Spanish from the first morning, with '
          + 'the city outside the window as the practice ground.',
        objectives: [
          'Consolidate the grammar and vocabulary of your level, and stretch beyond it',
          'Speak Spanish daily, in class and in the city, until it starts answering back',
          'Practise the Spanish of everyday life, work and travel',
        ],
        outcomes: [
          'Hold conversations at your level, in shops and classrooms alike',
          'Understand spoken Spanish at natural speed better than before',
          'Know your level precisely, and the path to the next one',
          'Keep learning at home with habits the week established',
        ],
      },
      {
        id: 'communication-skills-spanish',
        image: 'spanishStudioWhiteboard',
        title: 'Communication skills in Spanish',
        level: 'From B1',
        audience: 'Staff who use Spanish professionally — projects, partnerships, presentations, mobility.',
        summary: 'For people whose Spanish already works and now has a job to do: presenting, '
          + 'meeting, negotiating and building professional relationships in Spanish.',
        objectives: [
          'Structure presentations and contributions that land in Spanish',
          'Manage register — when Spanish is formal, and when warmth does more',
          'Handle questions, discussion and the telephone without retreating to English',
        ],
        outcomes: [
          'Present in Spanish with structure and composure',
          'Take part in meetings and project work in Spanish',
          'Judge register and courtesy the way the culture does',
          'Build working relationships with Spanish-speaking partners',
        ],
      },
      {
        id: 'methodology-teaching-spanish',
        image: 'spanishPrintsWall',
        title: 'Methodology for teaching Spanish',
        level: 'For teachers of Spanish',
        audience: 'Practising teachers of Spanish as a foreign language, at any stage of career.',
        summary: 'Methodology for the Spanish classroom, taught in Spanish and grounded where the '
          + 'language lives: communicative practice, skills work and culture that belongs in the lesson.',
        objectives: [
          'Refresh your methodology against current practice in Spanish teaching',
          'Design lessons where students produce Spanish rather than study it',
          'Bring culture into the language lesson as content, not decoration',
        ],
        outcomes: [
          'Plan communicative lessons for your own students’ level',
          'Correct and give feedback in ways that keep students speaking',
          'Use authentic material from Spanish life in class, judged for level',
          'Return with formats, not notes — lessons ready to run',
        ],
      },
    ],
  },
];

/** The group a sheet course label belongs to, for cross-references. */
export function groupForDateCourse(label) {
  return courseGroups.find((g) => g.dateCourses.includes(label));
}
