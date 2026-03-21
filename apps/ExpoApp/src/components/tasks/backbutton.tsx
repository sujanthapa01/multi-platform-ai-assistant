import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function BackButton({ link }) {
  return (
    <Link href={`${link}`} style={{ fontSize: 20 ,alignItems:"center", paddingBottom:4 }}>
      {" "}
      <Ionicons name="arrow-back-circle" size={20} />
      Back
    </Link>
  );
}
