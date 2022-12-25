import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const url = "http://192.168.0.194:3000"; //change mailAPI url your API
 
export default function ContectUs() {

  const [contectUsData, setContectUsData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const validate = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  };

  const handlePress = async () => {

    const { name, email, mobile, message } = contectUsData;

    if (!name || !email || !mobile || !message) {
      alert("All field are mendatory");
    } else if (!validate(email)) {
      alert("Please enter valid Email");
    } else if (mobile.length !== 10) {
      alert("Please enter valid Mobile Number");
    } else {

      try {
        const response = await fetch(`${url}/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contectUsData),
        });
        alert(`Thanks for your feedback ${name}`);
      } catch (error) {
        console.log("Error occured", error);
        alert("Sorry an error accured at our side");
      }

    }

    setContectUsData({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeader}>Contect Us</Text>
      <Text style={styles.description}>
        You can reach us anytime via info@redpositive.in{" "}
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>Enter your name</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="Your name"
          value={contectUsData.name}
          onChangeText={(text) => {
            setContectUsData({ ...contectUsData, name: text });
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your Email</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Your email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={contectUsData.email}
          onChangeText={(text) => {
            setContectUsData({ ...contectUsData, email: text });
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your Mobile Number</Text>
        <TextInput
          style={styles.inputStyle}
          maxLength={10}
          keyboardType="numeric"
          textContentType="numeric"
          placeholder="Your Monbile Number"
          value={contectUsData.mobile}
          onChangeText={(text) => {
            setContectUsData({ ...contectUsData, mobile: text });
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labels}>How can we help you !</Text>
        <TextInput
          style={[styles.inputStyle, , styles.multilineStyle]}
          placeholder="Message"
          numberOfLines={5}
          multiline={true}
          value={contectUsData.message}
          onChangeText={(text) => {
            setContectUsData({ ...contectUsData, message: text });
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
          <Text style={styles.buttonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  mainHeader: {
    fontSize: 20,
    color: "#344055",
    fontWeignt: "500",
    paddingTop: 50,
    paddingBottom: 15,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 20,
    color: "#7d7d7d",
    paddingBottom: 20,
    lineHeight: 25,
  },
  inputContainer: {
    marginTop: 17,
  },
  labels: {
    fontWeight: "bold",
    color: "#7d7d7d",
    paddingBottom: 5,
    lineHeight: 22,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
  },
  multilineStyle: {
    paddingVertical: 4,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#4630EB",
  },
  buttonText: {
    color: "#eee",
  },
});
