// Shown on /faq and sent to search engines as FAQPage data, so answers are plain text.

export const faqs: readonly { question: string; answer: string }[] = [
  {
    question: "What is Ur Late?",
    answer:
      "An app that keeps track, in minutes, of who kept whom waiting. Every time someone’s late you log it, and Ur Late nets it all out into one number: who owes whom, and how many minutes.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. Adding anyone, logging, balances and history are free, for good. Premium, a monthly or yearly subscription, adds unlimited groups, every share-card look and full stats. You can also unlock one of those for a day by choosing to watch an ad; there are never ads you didn’t ask for.",
  },
  {
    question: "Does the other person need the app?",
    answer:
      "No. Add anyone using just their name, even if they’re not on the app yet. When they join through your invite link or code, every minute and its whole history become theirs too.",
  },
  {
    question: "How is the balance worked out?",
    answer:
      "Every entry records who was late, by how many whole minutes, and who was waiting. Between two people, the minutes each waited for the other cancel out. If your brother kept you waiting 20 minutes and you kept him waiting 2, he owes you 18.",
  },
  {
    question: "Who can log an entry?",
    answer:
      "Both the person who waited and the person who was late. Own up and log it yourself, it’s good for the soul.",
  },
  {
    question: "What if someone logs something I don’t agree with?",
    answer:
      "Entries count straight away and you get notified. You have 48 hours to dispute one. If you’d rather approve every entry first, either of you can switch to confirm mode.",
  },
  {
    question: "Can I let someone off?",
    answer:
      "Yes. The person who’s owed can forgive some minutes or reset everything to zero. It stays in the history either way, and nothing ever resets by itself.",
  },
  {
    question: "Does it work for groups?",
    answer:
      "Yes. Make a group for the carpool, Friday lunch or the book club, log who was late and who waited, and see a leaderboard of who keeps everyone waiting.",
  },
  {
    question: "Can I use Ur Late on the web?",
    answer:
      "No, Ur Late is an app for iPhone and Android. This website is where invite links land and where you can learn how it works.",
  },
  {
    question: "Who can see what I log?",
    answer:
      "Only the people you log it with. Invite and share pages show only what you chose to share, and they’re kept out of search engines.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "In the app, go to Profile and delete your account. You can also do it on our delete-account page with a code we email you. Anything you share with people who have an account stays for them, with you turned back into a placeholder.",
  },
];
