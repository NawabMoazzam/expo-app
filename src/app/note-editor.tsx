import Button from "@/components/ui/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useCSSVariable } from "uniwind";

export default function NoteEditor() {
  const { noteID } = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(true);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [mutedForeground] = useCSSVariable([
    "--color-muted-foreground",
  ]) as Array<string>;

  useEffect(() => {
    if (noteID != undefined) {
      // const ExistingNote = getNoteById(Number(noteID));
      // setTitle(ExistingNote?.title || "");
      // setContent(ExistingNote?.content || "");
    }
  }, []);

  const handelSave = () => {
    if (noteID === undefined) {
      // addNote(title, content);
    } else {
      // updateNote(Number(noteID), title, content);
    }
    setIsEditing(false);
  };

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.View hidden={!isEditing}>
          <Button variant="outline" title="Save" onPress={() => handelSave()} />
        </Stack.Toolbar.View>
        <Stack.Toolbar.View hidden={isEditing}>
          <Button
            variant="outline"
            title="Edit"
            onPress={() => setIsEditing(true)}
          />
        </Stack.Toolbar.View>
      </Stack.Toolbar>

      <View className="flex-1 mx-2">
        {isEditing ? (
          <TextInput
            numberOfLines={1}
            placeholder="Enter Title..."
            placeholderTextColor={mutedForeground}
            value={title}
            onChangeText={setTitle}
            className="text-lg font-bold text-foreground"
          />
        ) : (
          <Text className="text-foreground">{title}</Text>
        )}
        <View className="border-t border-border my-4" />
        <ScrollView>
          {isEditing ? (
            <TextInput
              multiline
              placeholder="Write something beautifull..."
              placeholderTextColor={mutedForeground}
              value={content}
              onChangeText={setContent}
              autoFocus
              className="text-lg text-foreground"
            />
          ) : (
            <Text className="text-foreground">{content}</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
