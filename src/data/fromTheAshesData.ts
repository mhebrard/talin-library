import { Era } from './types';

// NOTE: Each phase is a list of groups. A group is a run of issues read together:
// - a series group (consecutive issues of one series, e.g. X-Men #1-7), or
// - a crossover group (issues from several series, e.g. Raid on Graymalkin) - give it a `title`.
// Group order, then issue order inside each group, defines the chronological reading order.
export const FROM_THE_ASHES_ERA: Era = {
  id: 'from-the-ashes',
  title: 'X-Men: From the Ashes',
  franchise: 'X-Men',
  startYear: 2024,
  description:
    'Following the fall of Krakoa, mutantkind enters a bold new era with three flagship teams based in Alaska, Louisiana, and Chicago, supported by global squads and solo journeys across the Marvel Universe.',
  phases: [
    {
      id: 'phase-1',
      number: 1,
      name: 'Phase 1: The First Wave & Core Flagships',
      tagline: 'Three core teams emerge from the ashes to protect a divided mutant race.',
      description:
        'Mutants must reintegrate into human society following the collapse of their nation-state. Jed MacKay leads the main X-Men in Alaska, Gail Simone helms Uncanny X-Men in Louisiana, and Eve L. Ewing chronicles Exceptional X-Men in Chicago.',
      // Reading order is strictly determined by the group order, then the issue order inside each group
      groups: [
        {
          issues: [
            {
              seriesId: 'x-men-2024',
              issueNumber: 1,
              releaseDate: '2024-07-10',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/80/66a7f5db1bc6f/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/reader/32821/240667',
              summary:
                "FROM THE ASHES! Krakoa is gone, ORCHIS has fallen...but the X-Men remain, always. Cyclops leads, because that is what he does. Beast builds, because that is what he does. And from their new home in Alaska, the X-Men raise a flag of defiance. Mutant business is their business. Join CYCLOPS, BEAST, MAGNETO, PSYLOCKE, KID OMEGA, TEMPER, MAGIK and JUGGERNAUT as new forces in the world move into position, battling for the destiny and philosophy of the mutant species.",
              writers: ['Jed MacKay'],
              artists: ['Ryan Stegman'],
              isEssential: true,
            },
            {
              seriesId: 'x-men-2024',
              issueNumber: 2,
              releaseDate: '2024-08-14',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/9/e0/66bb71a8e0f89/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/32821-x-men-2024.html',
              summary:
                "INVASION! The X-Men fly to the rescue of a mutant in crisis in San Francisco. The problem? Alien invaders seem to have a similar idea. Six X-Men vs. an invading alien fleet? Sounds about right. PLUS: THE CONCLUSION OF DEADPOOL/WOLVERINE: WEAPON X-TRACTION!",
              writers: ['Jed MacKay'],
              artists: ['Ryan Stegman'],
              isEssential: true,
            },
            {
              seriesId: 'x-men-2024',
              issueNumber: 3,
              releaseDate: '2024-08-28',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/8/d0/66bb70e013a9b/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/32821-x-men-2024.html',
              summary:
                "SCOTT SUMMERS VS. THE UNITED STATES OF AMERICA! How did the X-Men come to possess their HQ, the Factory, and how difficult a position does that put them in? As Cyclops meets the implacable Agent Lundqvist, the X-Men come to find that their new home may not be as secure as they had thought...",
              writers: ['Jed MacKay'],
              artists: ['Ryan Stegman'],
              isEssential: true,
            },
            {
              seriesId: 'x-men-2024',
              issueNumber: 4,
              releaseDate: '2024-09-18',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/a0/66e3480092ea8/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/32821-x-men-2024.html',
              summary:
                "THEY KILL FOR KICKS & THEY KILL FOR CLICKS! \"Hello, internet - it's your boy, Trevor Fitzroy! That's right, Trevor Fitzroy and the Upstarts, out there delivering the content you crave: livestreamed, bespoke, mutant murder in high-def! And best of all, you, the viewers, are the ones rating the kills! So smash that like button, hit subscribe and tell us who the number-one killer is!\"",
              writers: ['Jed MacKay'],
              artists: ['Netho Diaz'],
              isEssential: true,
            },
            {
              seriesId: 'x-men-2024',
              issueNumber: 5,
              releaseDate: '2024-10-02',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/9/50/66fc08a3a924c/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/32821-x-men-2024.html',
              summary:
                "While the X-Men engage the social-media sociopath Upstarts, Kid Omega and Psylocke dive deep into the mind of a troubled mutant. Silence: Psychic Rescue in Progress! But Quentin Quire has never been good at keeping his mouth shut...",
              writers: ['Jed MacKay'],
              artists: ['Ryan Stegman'],
              isEssential: true,
            },
            {
              seriesId: 'x-men-2024',
              issueNumber: 6,
              releaseDate: '2024-10-23',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/20/67112f95db510/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/32821-x-men-2024.html',
              summary:
                "While the X-Men attempt to unravel the globe-spanning conspiracy arrayed against them, Temper and Magik work to investigate one closer to home. Merle, Alaska, holds more secrets than just the ones kept within the Factory, and the two mutants must leave the safety of their headquarters and hit the streets for answers.",
              writers: ['Jed MacKay'],
              artists: ['Netho Diaz'],
              isEssential: true,
            },
            {
              seriesId: 'x-men-2024',
              issueNumber: 7,
              releaseDate: '2024-11-06',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/9/03/66c721821944c/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/32821-x-men-2024.html',
              summary:
                "The Iron Night! What does the town of Merle, Alaska owe the X-Men? Where did the defunct Sentinel looming over the town come from? And more importantly, what was it after?",
              writers: ['Jed MacKay'],
              artists: ['Netho Diaz'],
              isEssential: true,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'uncanny-x-men-2024',
              issueNumber: 1,
              releaseDate: '2024-08-07',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/b/c0/66acfcb1a1463/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Uncanny+X-Men+2024',
              summary:
                "PROFESSOR X...IS GONE! A core group of essential X-Men rise FROM THE ASHES to face a world without a home - and without Professor X! All bonds among the mutant community seem to be slipping away, and ROGUE reluctantly finds herself as the hero designated to bring them back together...but a fearless, malignant power is out there hunting mutants, and it has a terrible secret that may destroy what remains of the X-Men!",
              writers: ['Gail Simone'],
              artists: ['David Marquez'],
              isEssential: true,
            },
            {
              seriesId: 'uncanny-x-men-2024',
              issueNumber: 2,
              releaseDate: '2024-09-11',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/30/66d0820c9304e/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Uncanny+X-Men+2024',
              summary:
                "WHO ARE THE OUTLIERS? FROM THE ASHES continues as ROGUE, GAMBIT and WOLVERINE welcome a friend back, just in time to face four UNCONTROLLABLE and WILD mutants in the swamps of Louisiana! But with the mutant community disheartened and fractured, will even the UNCANNY X-MEN be enough to stop them? Something HUGE is starting, and it begins RIGHT HERE!",
              writers: ['Gail Simone'],
              artists: ['David Marquez'],
              isEssential: true,
            },
            {
              seriesId: 'uncanny-x-men-2024',
              issueNumber: 3,
              releaseDate: '2024-09-25',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/c/20/66e347bbe3ac2/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Uncanny+X-Men+2024',
              summary:
                "CATCH THE ELF! When new, lethally powerful and completely untrained young mutants show up on Rogue's doorstep with no knowledge of how they got there, a grieving Rogue seeks to take Xavier's place in guiding them to the light... ...while darkness from the past returns to destroy the X-Men, one at a time!",
              writers: ['Gail Simone'],
              artists: ['David Marquez'],
              isEssential: true,
            },
            {
              seriesId: 'uncanny-x-men-2024',
              issueNumber: 4,
              releaseDate: '2024-10-16',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/d0/6706837ee6ac3/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Uncanny+X-Men+2024',
              summary:
                "With one X-Man down and hell coming for the rest, ROGUE finds herself alone against a power of darkness she is completely unprepared for. No backup, no lifeline and NO WAY OUT. And as she fights alone, a secret of the new recruits is revealed - is one of them the ENDLING that will destroy all mutantkind?",
              writers: ['Gail Simone'],
              artists: ['David Marquez'],
              isEssential: true,
            },
            {
              seriesId: 'uncanny-x-men-2024',
              issueNumber: 5,
              releaseDate: '2024-11-13',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/40/67337c6c16c21/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Uncanny+X-Men+2024',
              summary:
                "The brutal conclusion to the RED WAVE storyline is here! The Uncanny X-MEN face an unstoppable force of evil and death who reveals a shocking secret...but they may not survive long enough to face it! Will the next generation of young mutants stand by Rogue and her team or join the other side?",
              writers: ['Gail Simone'],
              artists: ['Javier Garron', 'David Marquez'],
              isEssential: true,
            },
            {
              seriesId: 'uncanny-x-men-2024',
              issueNumber: 6,
              releaseDate: '2024-11-27',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/c/f0/67337040e1910/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Uncanny+X-Men+2024',
              summary:
                "It's BACK TO SCHOOL for four young mutants... ...But is a rural school in Louisiana READY for this crew? Bullies, terrible lunches and classroom flirting abound...but IS one of the student body the prophesied ENDLING, who will be the last member of mutantkind? Plus - Jubilee undertakes a fateful solo mission!",
              writers: ['Gail Simone'],
              artists: ['Javier Garron'],
              isEssential: true,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'exceptional-x-men-2024',
              issueNumber: 1,
              releaseDate: '2024-09-04',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/c0/66d0829718a2e/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Exceptional+X-Men+2024',
              summary:
                "KATE PRYDE LEADS A TEAM OF ALL-NEW X-MEN! After the fall of Krakoa, Kate Pryde is trying to get as far away from all things X as she possibly can. She's just a regular-degular bartender now. Definitely NOT getting ready to head up an ALL-NEW TEAM of wayward young mutants while avoiding the watchful gaze of Emma Frost. Nothing in this title but work, dating and staving off depression. That's it. No never-before-seen EXCEPTIONAL X-MEN to see here!",
              writers: ['Eve L. Ewing'],
              artists: ['Carmen Carnero'],
              isEssential: true,
            },
            {
              seriesId: 'exceptional-x-men-2024',
              issueNumber: 2,
              releaseDate: '2024-10-09',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/90/66fc089d8fee6/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Exceptional+X-Men+2024',
              summary:
                "Kate Pryde's continued attempts at living a normal, non-mutant life go laughably wrong as she finds herself in the middle of a brawl started by a couple of headstrong teens with remarkable abilities - which, of course, they're terrible at controlling. She's sworn off being anybody's teacher, mentor, professor, sensei or anything that reminds her of her old life. But will the White Queen force her hand?",
              writers: ['Eve L. Ewing'],
              artists: ['Carmen Carnero'],
              isEssential: true,
            },
            {
              seriesId: 'exceptional-x-men-2024',
              issueNumber: 3,
              releaseDate: '2024-11-20',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/5/03/673370825e4a1/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Exceptional+X-Men+2024',
              summary:
                "EMMA FROST VS KITTY PRYDE! Kitty Pryde's determination to stay doggedly away from all things X-Men related becomes more strained by the day as EMMA FROST once again sticks her nose into things. Meanwhile, our new team is finding their rhythm. AXO, MELEE and BRONZE have officially entered the fray!",
              writers: ['Eve L. Ewing'],
              artists: ['Carmen Carnero'],
              isEssential: true,
            },
            {
              seriesId: 'exceptional-x-men-2024',
              issueNumber: 4,
              releaseDate: '2024-12-25',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/9/40/67603a846abaf/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Exceptional+X-Men+2024',
              summary:
                "LO, THE ICEMAN COMETH! But Kitty Pryde suspects that her old comrade Bobby Drake isn't being entirely honest with her. And our all-new hero BRONZE faces her first big solo battle and also has to interact with a person she has a crush on! Which is worse?!",
              writers: ['Eve L. Ewing'],
              artists: ['Carmen Carnero'],
              isEssential: true,
            },
            {
              seriesId: 'exceptional-x-men-2024',
              issueNumber: 5,
              releaseDate: '2025-01-15',
              coverUrl: 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/10/6780372ac8c79/detail.webp',
              onlineLibraryUrl: 'https://batcave.biz/index.php?do=search&subaction=search&story=Exceptional+X-Men+2024',
              summary:
                "Saying the past is the past doesn't make it so, and Kitty is carrying the weight of her choices. Violence, vengeance and her life as Shadowkat are not so easily left behind - especially now that the rest of her team of new recruits knows the ugly reality of what she did in the shadow of Krakoa's fall. Now that the truth is out, so is Melee, leaving the EXCEPTIONAL X-MEN on the rocks.",
              writers: ['Eve L. Ewing'],
              artists: ['Carmen Carnero'],
              isEssential: true,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'phoenix-2024',
              issueNumber: 1,
              title: 'Cosmic Ascendant',
              releaseDate: '2024-07-17',
              coverUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39328/phoenix_2024',
              summary: 'Jean Grey takes flight into deep space as an independent cosmic guardian answerable only to the universe.',
              writers: ['Stephanie Phillips'],
              artists: ['Alessandro Miracolo'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'nyx-2024',
              issueNumber: 1,
              title: 'Concrete Jungle',
              releaseDate: '2024-07-24',
              coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39329/nyx_2024',
              summary: 'Ms. Marvel, Wolverine (Laura Kinney), Prodigy, and Sophie Cuckoo navigate life and young adulthood in NYC.',
              writers: ['Collin Kelly', 'Jackson Lanzing'],
              artists: ['Francesco Mortarino'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'x-force-2024',
              issueNumber: 1,
              title: 'Fractured Timeline',
              releaseDate: '2024-07-31',
              coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39330/x-force_2024',
              summary: 'Forge invents a machine predicting systemic fractures across Earth, assembling an ad-hoc tactical team to fix them.',
              writers: ['Geoffrey Thorne'],
              artists: ['Marcus To'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'x-factor-2024',
              issueNumber: 1,
              title: 'Government Sanction',
              releaseDate: '2024-08-14',
              coverUrl: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39333/x-factor_2024',
              summary: 'Havok and Angel are recruited into a government-sponsored, publicity-driven mutant strike force.',
              writers: ['Mark Russell'],
              artists: ['Bob Quinn'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'wolverine-2024',
              issueNumber: 1,
              title: 'The Wilderness',
              releaseDate: '2024-09-11',
              coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39335/wolverine_2024',
              summary: 'Logan retreats to the isolated Canadian wilderness to run with wolves, until an old predator tracks his scent.',
              writers: ['Saladin Ahmed'],
              artists: ['Martín Cóccolo'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'x-factor-2024',
              issueNumber: 2,
              title: 'Press Conference',
              releaseDate: '2024-09-25',
              coverUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/issue/114685/x-factor_2024_2',
              summary: 'A public relations disaster forces X-Factor into a clash with anti-mutant demonstrators on live television.',
              writers: ['Mark Russell'],
              artists: ['Bob Quinn'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'storm-2024',
              issueNumber: 1,
              title: 'The Voice of Earth',
              releaseDate: '2024-10-02',
              coverUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39336/storm_2024',
              summary: 'Ororo Munroe accepts a seat as a global diplomat and Avenger while balancing cosmic mutant leadership.',
              writers: ['Murewa Ayodele'],
              artists: ['Lucas Werneck'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'x-factor-2024',
              issueNumber: 3,
              title: 'Corporate Assets',
              releaseDate: '2024-10-23',
              coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/issue/114686/x-factor_2024_3',
              summary: 'Havok discovers hidden contractual clauses binding the team to privatized black-ops defense corporations.',
              writers: ['Mark Russell'],
              artists: ['Bob Quinn'],
              isEssential: false,
            },
          ],
        },
      ],
    },
    {
      id: 'phase-2',
      number: 2,
      name: 'Phase 2: Secondary Waves & Shifting Frontlines',
      tagline: 'Alliances fracture as specialized covert teams and new threats deploy.',
      description:
        'With mutant presence established globally, Sentinels are repurposed for hunter-killer operations and independent covert agents like Psylocke take center stage.',
      // Reading order is strictly determined by the group order, then the issue order inside each group
      groups: [
        {
          issues: [
            {
              seriesId: 'sentinels-2024',
              issueNumber: 1,
              title: 'Iron Flesh',
              releaseDate: '2024-10-30',
              coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39337/sentinels_2024',
              summary: 'Human soldiers cybernetically bound into Sentinel exoskeleton suits are deployed on hazardous containment duty.',
              writers: ['Alex Paknadel'],
              artists: ['Justin Mason'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'psylocke-2024',
              issueNumber: 1,
              title: 'Shadow Assassin',
              releaseDate: '2024-11-06',
              coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/series/39338/psylocke_2024',
              summary: 'Kwannon undertakes solo black ops missions to dismantle human trafficking cartels exploiting displaced mutants.',
              writers: ['Alyssa Wong'],
              artists: ['Vincenzo Carratù'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'wolverine-2024',
              issueNumber: 2,
              title: 'Wendigo Territory',
              releaseDate: '2024-12-04',
              coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/issue/114688/wolverine_2024_2',
              summary: 'Nightmarish Wendigo curses spread across the Yukon, dragging Logan into a brutal battle for survival.',
              writers: ['Saladin Ahmed'],
              artists: ['Martín Cóccolo'],
              isEssential: false,
            },
          ],
        },
        {
          issues: [
            {
              seriesId: 'sentinels-2024',
              issueNumber: 2,
              title: 'System Override',
              releaseDate: '2024-12-11',
              coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
              onlineLibraryUrl: 'https://www.marvel.com/comics/issue/114689/sentinels_2024_2',
              summary: 'Sentinel pilot Drummer experiences neural feedback as the suit AI begins acting independently of human control.',
              writers: ['Alex Paknadel'],
              artists: ['Justin Mason'],
              isEssential: false,
            },
          ],
        },
      ],
    },
  ],
};
