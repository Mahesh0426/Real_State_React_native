import {
  Client,
  Avatars,
  Account,
  Databases,
  Storage,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import { Property } from "../types";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

// Configuration object containing all Appwrite project credentials and IDs
export const config = {
  platform: "com.mahesh.realstate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

// Initialize Appwrite client with project configuration
export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

// Export Appwrite service instances
export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

//Google OAuth login function
export async function login() {
  try {
    // Create deep link redirect URL for OAuth callback
    const redirectUri = Linking.createURL("/");

    // Request OAuth2 token from Google provider
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Create OAuth2 token failed");

    // Open browser for Google authentication
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    // Check if user completed authentication
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    // Extract authentication parameters from callback URL
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    // Validate required parameters
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    // Create authenticated session with user credentials
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Logout function
export async function logout() {
  try {
    // Delete the active session from Appwrite
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch currently logged-in user details
export async function getCurrentUser() {
  try {
    // Get user account data from Appwrite
    const result = await account.get();

    // Check if user exists (valid user has an $id)
    if (result.$id) {
      // Generate avatar initials from user's name
      const userAvatar = avatar.getInitials(result.name);

      // Return user data with avatar URL included
      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//get latest properties
export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents as unknown as Property[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

//get properties
export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.search("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents as unknown as Property[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get property by id
export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id,
      [
        Query.select([
          "*", // Select all fields of the property
          "agent.*", // Include all fields of the related agent
          "gallery.*", // Include all fields of the related galleries
          "reviews.*", // Include all fields of the related reviews
        ]),
      ]
    );

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
