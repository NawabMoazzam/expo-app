import Button from "@/components/ui/Button";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View, useColorScheme } from "react-native";

interface Note {
  id: number;
  title: string;
  content: string;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Grocery Shopping List",
    content:
      "Need to buy fresh ingredients for the upcoming week. Grab organic spinach, a carton of almond milk, whole wheat bread, and three chicken breasts. Do not forget to check the baking aisle for vanilla extract and chocolate chips. Also, pick up some fresh Honeycrisp apples if they look good.",
  },
  {
    id: 2,
    title: "Project Alpha Brainstorming",
    content:
      "We need to redesign the user dashboard to make it more intuitive. Focus heavily on simplifying the main navigation sidebar. Users are complaining that the current layout is too cluttered. Let's propose moving the analytics metrics to a dedicated tab and adding a dark mode toggle by next Monday.",
  },
  {
    id: 3,
    title: "Gym Workout Routine",
    content:
      "Today is a heavy push day focused on chest, shoulders, and triceps. Start with a thorough ten-minute dynamic stretch. Move to barbell bench press for 4 sets of 8 reps. Follow that up with overhead dumbbell press, incline cable flies, and finish strong with three high-rep sets of tricep rope pushdowns.",
  },
  {
    id: 4,
    title: "Book Recommendations to Read",
    content:
      "Several friends highly recommended checking out 'Atomic Habits' by James Clear to improve daily productivity. I also want to dive into some classic science fiction, so I added 'Dune' by Frank Herbert to my list. Lastly, I need to buy 'Thinking, Fast and Slow' for my professional book club discussion next month.",
  },
  {
    id: 5,
    title: "Weekly Meal Prep Ideas",
    content:
      "Plan for healthy lunches from Monday to Friday to avoid ordering takeout. This week will be honey garlic grilled chicken served over brown rice and roasted broccoli. For dinner, prepare a large batch of vegetarian chili loaded with black beans, diced tomatoes, sweet potatoes, and corn to last a few days.",
  },
  {
    id: 6,
    title: "Car Maintenance Tasks",
    content:
      "The sedan is overdue for its regular routine checkup. Schedule an appointment at the local auto shop for an oil change and tire rotation. Ask the mechanic to inspect the front brake pads because they have been squeaking slightly on cold mornings. Check the windshield wiper fluid level before leaving.",
  },
  {
    id: 7,
    title: "Coding Best Practices",
    content:
      "Always write clean, self-documenting code to help team members understand your logic. Keep your functions small and focused on a single responsibility. Write comprehensive unit tests for all edge cases before pushing your branch to production. Remember to run the linter locally to catch formatting errors early.",
  },
  {
    id: 8,
    title: "Vacation Packing Checklist",
    content:
      "Make sure all travel essentials are packed neatly in the carry-on bag. Bring three casual outfits, a formal dress shirt, comfortable walking shoes, and swimwear. Double-check that passport, digital flight tickets, and hotel confirmation receipts are easily accessible. Do not forget the multi-port phone charger.",
  },
  {
    id: 9,
    title: "Gardening Guide and Tips",
    content:
      "The backyard tomato plants need consistent watering early in the morning every day. Apply an organic liquid fertilizer once every two weeks to encourage healthy fruit growth. Watch out for pesky aphids hiding underneath the large green leaves. Prune away the dead yellow branches to maximize sunlight exposure.",
  },
  {
    id: 10,
    title: "Meeting Notes: Marketing",
    content:
      "Reviewed the performance data for the Q2 social media ad campaign. Our conversion rate increased by fifteen percent after switching to high-quality video formats. For Q3, we plan to partner with three micro-influencers in the fitness space. The design team will deliver the new ad creative assets by Friday afternoon.",
  },
  {
    id: 11,
    title: "House Cleaning Schedule",
    content:
      "Break down the chores across the weekend so it does not feel overwhelming. Saturday morning is dedicated to vacuuming the rugs and washing the hardwood floors. Sunday afternoon will be used for dusting the living room bookshelves, cleaning the bathroom mirrors, and throwing a large load of bed sheets into the laundry.",
  },
  {
    id: 12,
    title: "Spanish Vocabulary Practice",
    content:
      "Spend twenty minutes every evening reviewing common conversational phrases. Focus on mastering past tense verb conjugations for regular verbs this week. Try reading a short news article online in Spanish to practice contextual comprehension. Listen to an educational language podcast during my daily afternoon commute.",
  },
  {
    id: 13,
    title: "Gift Ideas for Mom",
    content:
      "Mom's birthday is coming up soon and I want to get her something thoughtful. She mentioned wanting a high-quality ceramic essential oil diffuser for her bedroom. Another great option would be a gift card to her favorite local day spa for a relaxing massage. Pair whatever I choose with a handwritten card.",
  },
  {
    id: 14,
    title: "Financial Budget Review",
    content:
      "Sit down this evening to analyze last month's personal spending habits. Look closely at the dining out category to see where we can trim unnecessary costs. Allocate a higher percentage of this month's paycheck directly into the high-yield savings account. Set up automatic monthly payments for the electric utility bill.",
  },
  {
    id: 15,
    title: "Recipe: Perfect Chocolate Cookies",
    content:
      "Whisk together softened unsalted butter, white sugar, and brown sugar until light and fluffy. Slowly add in two large eggs and a splash of pure vanilla extract. In a separate bowl, mix flour, baking soda, and sea salt. Combine everything together gently before folding in a generous amount of dark chocolate chunks.",
  },
];

export default function Index() {
  const colorScheme = useColorScheme();
  const rippleColor =
    colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";

  return (
    <View className="flex-1 relative px-5 pt-2.5">
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id.toString()}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item: note }) => (
          <Pressable
            className="bg-card p-4 mb-4 border border-border dark:border-0 rounded-2xl shadow-m dark:shadow-l overflow-hidden"
            style={{ borderRadius: 16 }}
            onPress={() => {
              router.navigate({
                pathname: "/note-editor",
                params: { noteID: note.id },
              });
            }}
            android_ripple={{
              color: rippleColor,
              borderless: false,
            }}
          >
            <Text className="text-foreground text-lg font-bold">
              {note.title}
            </Text>
            <Text className="text-muted-foreground mt-2">
              {note.content?.slice(0, 100)}
              {note.content && note.content.length > 100 ? "..." : ""}
            </Text>
          </Pressable>
        )}
      />
      <Button
        onPress={() => {
          router.navigate("/note-editor");
        }}
        iconName="add-sharp"
        size="md"
        className="absolute py-4 right-6 bottom-24"
        style={{ elevation: 5 }}
      />
    </View>
  );
}
