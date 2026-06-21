import Button from "@/components/ui/Button";
import { addNote, getNoteById, initDatabase, updateNote } from "@/lib/database";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useCSSVariable } from "uniwind";

export default function NoteEditor() {
  const { noteID } = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(!noteID ? true : false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [mutedForeground] = useCSSVariable([
    "--color-muted-foreground",
  ]) as Array<string>;

  useEffect(() => {
    initDatabase();
    if (noteID != undefined) {
      const ExistingNote = getNoteById(Number(noteID));
      setTitle(ExistingNote?.title || "");
      setContent(ExistingNote?.content || "");
    }
  }, []);

  const handelSave = () => {
    if (noteID === undefined) {
      addNote(title, content);
      router.back();
    } else {
      updateNote(Number(noteID), title, content);
    }
    setIsEditing(false);
  };

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.View hidden={!isEditing}>
          <View className="w-24 h-14 flex items-center justify-center">
            <Button
              variant="primary"
              size="sm"
              iconName="save"
              title="Save"
              disabled={!title && !content}
              onPress={() => handelSave()}
            />
          </View>
        </Stack.Toolbar.View>
        <Stack.Toolbar.View hidden={isEditing}>
          <View className="w-24 h-14 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              title="Edit"
              iconName="pencil"
              onPress={() => setIsEditing(true)}
            />
          </View>
        </Stack.Toolbar.View>
      </Stack.Toolbar>

      <View className="flex-1 m-4">
        {isEditing ? (
          <TextInput
            numberOfLines={1}
            placeholder="Enter Title..."
            placeholderTextColor={mutedForeground}
            value={title}
            onChangeText={setTitle}
            className="text-lg font-bold text-foreground p-0"
          />
        ) : !title ? (
          <Text className="text-lg font-bold text-muted-foreground">
            Enter Title...
          </Text>
        ) : (
          <Text className="text-lg font-bold text-foreground">{title}</Text>
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
              className="text-lg text-foreground p-0"
            />
          ) : !content ? (
            <Text className="text-lg text-muted-foreground">
              What's in your mind???
            </Text>
          ) : (
            <Text className="text-lg text-foreground">{content}</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
