import { ThemeSwitcher } from "@/components/Theme-Switcher";
import Button from "@/components/ui/Button";
import { useTabBar } from "@/context/TabBarContext";
import { deleteNote, getNotes, initDatabase, Note } from "@/lib/database";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useCSSVariable } from "uniwind";

// const demoNotes: Note[] = [
//   {
//     id: 1,
//     title: "Grocery Shopping List",
//     content:
//       "Need to buy fresh ingredients for the upcoming week. Grab organic spinach, a carton of almond milk, whole wheat bread, and three chicken breasts. Do not forget to check the baking aisle for vanilla extract and chocolate chips. Also, pick up some fresh Honeycrisp apples if they look good.",
//   },
//   {
//     id: 2,
//     title: "Project Alpha Brainstorming",
//     content:
//       "We need to redesign the user dashboard to make it more intuitive. Focus heavily on simplifying the main navigation sidebar. Users are complaining that the current layout is too cluttered. Let's propose moving the analytics metrics to a dedicated tab and adding a dark mode toggle by next Monday.",
//   },
//   {
//     id: 3,
//     title: "Gym Workout Routine",
//     content:
//       "Today is a heavy push day focused on chest, shoulders, and triceps. Start with a thorough ten-minute dynamic stretch. Move to barbell bench press for 4 sets of 8 reps. Follow that up with overhead dumbbell press, incline cable flies, and finish strong with three high-rep sets of tricep rope pushdowns.",
//   },
//   {
//     id: 4,
//     title: "Book Recommendations to Read",
//     content:
//       "Several friends highly recommended checking out 'Atomic Habits' by James Clear to improve daily productivity. I also want to dive into some classic science fiction, so I added 'Dune' by Frank Herbert to my list. Lastly, I need to buy 'Thinking, Fast and Slow' for my professional book club discussion next month.",
//   },
//   {
//     id: 5,
//     title: "Weekly Meal Prep Ideas",
//     content:
//       "Plan for healthy lunches from Monday to Friday to avoid ordering takeout. This week will be honey garlic grilled chicken served over brown rice and roasted broccoli. For dinner, prepare a large batch of vegetarian chili loaded with black beans, diced tomatoes, sweet potatoes, and corn to last a few days.",
//   },
//   {
//     id: 6,
//     title: "Car Maintenance Tasks",
//     content:
//       "The sedan is overdue for its regular routine checkup. Schedule an appointment at the local auto shop for an oil change and tire rotation. Ask the mechanic to inspect the front brake pads because they have been squeaking slightly on cold mornings. Check the windshield wiper fluid level before leaving.",
//   },
//   {
//     id: 7,
//     title: "Coding Best Practices",
//     content:
//       "Always write clean, self-documenting code to help team members understand your logic. Keep your functions small and focused on a single responsibility. Write comprehensive unit tests for all edge cases before pushing your branch to production. Remember to run the linter locally to catch formatting errors early.",
//   },
//   {
//     id: 8,
//     title: "Vacation Packing Checklist",
//     content:
//       "Make sure all travel essentials are packed neatly in the carry-on bag. Bring three casual outfits, a formal dress shirt, comfortable walking shoes, and swimwear. Double-check that passport, digital flight tickets, and hotel confirmation receipts are easily accessible. Do not forget the multi-port phone charger.",
//   },
//   {
//     id: 9,
//     title: "Gardening Guide and Tips",
//     content:
//       "The backyard tomato plants need consistent watering early in the morning every day. Apply an organic liquid fertilizer once every two weeks to encourage healthy fruit growth. Watch out for pesky aphids hiding underneath the large green leaves. Prune away the dead yellow branches to maximize sunlight exposure.",
//   },
//   {
//     id: 10,
//     title: "Meeting Notes: Marketing",
//     content:
//       "Reviewed the performance data for the Q2 social media ad campaign. Our conversion rate increased by fifteen percent after switching to high-quality video formats. For Q3, we plan to partner with three micro-influencers in the fitness space. The design team will deliver the new ad creative assets by Friday afternoon.",
//   },
//   {
//     id: 11,
//     title: "House Cleaning Schedule",
//     content:
//       "Break down the chores across the weekend so it does not feel overwhelming. Saturday morning is dedicated to vacuuming the rugs and washing the hardwood floors. Sunday afternoon will be used for dusting the living room bookshelves, cleaning the bathroom mirrors, and throwing a large load of bed sheets into the laundry.",
//   },
//   {
//     id: 12,
//     title: "Spanish Vocabulary Practice",
//     content:
//       "Spend twenty minutes every evening reviewing common conversational phrases. Focus on mastering past tense verb conjugations for regular verbs this week. Try reading a short news article online in Spanish to practice contextual comprehension. Listen to an educational language podcast during my daily afternoon commute.",
//   },
//   {
//     id: 13,
//     title: "Gift Ideas for Mom",
//     content:
//       "Mom's birthday is coming up soon and I want to get her something thoughtful. She mentioned wanting a high-quality ceramic essential oil diffuser for her bedroom. Another great option would be a gift card to her favorite local day spa for a relaxing massage. Pair whatever I choose with a handwritten card.",
//   },
//   {
//     id: 14,
//     title: "Financial Budget Review",
//     content:
//       "Sit down this evening to analyze last month's personal spending habits. Look closely at the dining out category to see where we can trim unnecessary costs. Allocate a higher percentage of this month's paycheck directly into the high-yield savings account. Set up automatic monthly payments for the electric utility bill.",
//   },
//   {
//     id: 15,
//     title: "Recipe: Perfect Chocolate Cookies",
//     content:
//       "Whisk together softened unsalted butter, white sugar, and brown sugar until light and fluffy. Slowly add in two large eggs and a splash of pure vanilla extract. In a separate bowl, mix flour, baking soda, and sea salt. Combine everything together gently before folding in a generous amount of dark chocolate chunks.",
//   },
// ];

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);
  const [primary, foreground] = useCSSVariable([
    "--color-primary",
    "--color-foreground",
  ]) as Array<string>;
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const rippleColor =
    colorScheme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)";
  const { setTabBarStyle } = useTabBar();

  const loadNotes = () => {
    const savedNotes = getNotes();
    setNotes(savedNotes);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSelectedNotes([]);
    loadNotes();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    initDatabase();
    loadNotes();
  }, []);

  const clearSelection = () => {
    setSelectedNotes([]);
  };

  const handleSelectAll = () => {
    if (selectedNotes.length === notes.length) {
      setSelectedNotes([]);
      return;
    }

    setSelectedNotes(notes.map((note) => note.id));
  };

  const handleDeleteSelected = () => {
    if (selectedNotes.length === 0) {
      return;
    }

    selectedNotes.forEach((id) => deleteNote(id));
    setSelectedNotes([]);
    loadNotes();
  };

  const isSelectionMode = selectedNotes.length > 0;

  useEffect(() => {
    const parentNavigation = navigation.getParent() || navigation;

    parentNavigation.setOptions({
      headerTitle: isSelectionMode
        ? `${selectedNotes.length} selected`
        : "Nawab Notes",
      headerLeft: isSelectionMode
        ? () => (
            <Pressable onPress={clearSelection} className="mr-2">
              <Ionicons name="close" size={20} color={foreground} />
            </Pressable>
          )
        : undefined,
      headerRight: isSelectionMode
        ? () => (
            <View className="flex-row items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                title={
                  selectedNotes.length === notes.length ? "Clear" : "Select all"
                }
                onPress={handleSelectAll}
              />
              <Button
                variant="destructive"
                size="sm"
                title="Delete"
                iconName="trash"
                onPress={handleDeleteSelected}
              />
            </View>
          )
        : () => <ThemeSwitcher />,
    });

    isSelectionMode ? setTabBarStyle({ display: "none" }) : setTabBarStyle({});
  }, [
    navigation,
    isSelectionMode,
    selectedNotes,
    notes,
    foreground,
    clearSelection,
    handleSelectAll,
    handleDeleteSelected,
  ]);

  const onNotePress = (id: number) => {
    if (selectedNotes.length === 0) {
      router.navigate({
        pathname: "/note-editor",
        params: { noteID: id },
      });
    } else {
      setSelectedNotes((prev) =>
        prev.includes(id)
          ? prev.filter((noteId) => noteId !== id)
          : [...prev, id],
      );
    }
  };

  const onNoteLongPress = (id: number) => {
    setSelectedNotes((prev) =>
      prev.includes(id)
        ? prev.filter((noteId) => noteId !== id)
        : [...prev, id],
    );
  };

  return (
    <View className="flex-1 relative px-5 pt-2.5">
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center h-full">
            <Text className="text-muted-foreground">
              No Notes Available Yet!
            </Text>
            <Text className="text-muted-foreground">
              Press the "+" icon to add one.
            </Text>
          </View>
        }
        renderItem={({ item: note }) => (
          <Pressable
            className={`${selectedNotes.includes(note.id) ? "bg-muted" : "bg-card"} flex-row items-center justify-between p-4 mb-4 border border-border dark:border-0 rounded-2xl shadow-m dark:shadow-l overflow-hidden`}
            android_ripple={{
              color: rippleColor,
              foreground: true,
            }}
            onPress={() => onNotePress(note.id)}
            onLongPress={() => onNoteLongPress(note.id)}
          >
            <View className="max-w-80">
              <Text
                numberOfLines={1}
                className="text-foreground text-lg font-bold"
              >
                {note.title}
              </Text>
              <Text numberOfLines={2} className="text-muted-foreground mt-2">
                {note.content?.slice(0, 100)}
                {note.content && note.content.length > 100 ? "..." : ""}
              </Text>
            </View>
            {selectedNotes.includes(note.id) && (
              <Ionicons name="checkmark-circle" color={primary} size={27} />
            )}
          </Pressable>
        )}
      />
      {!isSelectionMode && (
        <Button
          onPress={() => {
            router.navigate("/note-editor");
          }}
          iconName="add-sharp"
          size="md"
          className="absolute py-4 right-6 bottom-6"
          style={{ elevation: 5 }}
        />
      )}
    </View>
  );
}
