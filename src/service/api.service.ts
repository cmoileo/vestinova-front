import {cookieManager} from "@/service/cookie.service";
import type {ItemType} from "@/type/Item.type";
import { jwtDecode } from "jwt-decode";


class ApiService {
  private readonly baseUrl: string = 'http://localhost:3001/api';
  public bearerToken: string | null = null;

  constructor() {
    this.getToken();
  }

  private getToken(): string | null {
    this.bearerToken = cookieManager.getCookie("token");
    // console.log("Token récupéré :", this.bearerToken);
    if (!this.bearerToken) {
      throw new Error("Aucun token trouvé dans les cookies");
    }
    return this.bearerToken;
  }
  

  public async register(data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    return response.json();
  }

  public async login(data: {
    email: string;
    password: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to login user');
    }

    return response.json();
  }

  public async getCategories(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/items-categories`, {
      headers: {
        "authorization": `${this.bearerToken}`,
      },
    });
    return await response.json();
  }

  public async createItem(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    files: File[];
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/items`, {
      method: 'POST',
      headers: {
        "authorization": `${this.bearerToken}`,
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to create item');
    }

    return response.json();
  }

  public async getItems(pagination: number): Promise<Items[] | void> {
    try {
      const response = await fetch(`${this.baseUrl}/items?pagination=${pagination}`, {
        headers: {
          "authorization": `${this.bearerToken}`,
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get items');
    }
  }

  public async getItem(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/items/${id}`, {
      headers: {
        "authorization": `${this.bearerToken
        }`,
      },
    });
    return await response.json();
  }

  public async searchItems(query: string): Promise<ItemType[]> {
    const response = await fetch(`${this.baseUrl}/items-search${query}`, {
      headers: {
        "authorization": `${this.bearerToken}`,
      },
    });
    return await response.json();
  }

  public getUserId(): string {
    if (!this.bearerToken) {
      throw new Error("Token JWT introuvable.");
    }
    try {
      const decodedToken: any = jwtDecode(this.bearerToken);
      // console.log("Token décodé :", decodedToken);
      return decodedToken.id || decodedToken.userId;
    } catch (err) {
      console.error("Erreur lors du décodage du token :", err);
      throw new Error("Token JWT invalide.");
    }
  }

  public async getUserProfile(userId: string): Promise<any> {
    // console.log("Appel API pour le profil utilisateur :", `${this.baseUrl}/user/${userId}/profile`);
    const response = await fetch(`${this.baseUrl}/user/${userId}/profile`, {
      method: "GET",
      headers: {
        Authorization: `${this.bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Erreur API :", errorMessage);
      throw new Error("Failed to fetch user profile");
    }
  
    return await response.json();
  }

  public async getUserPublicProfile(userId: string): Promise<any> {
    // console.log(`Fetching public profile for user: ${userId}`);
    const response = await fetch(`${this.baseUrl}/user/${userId}/public`, {
      method: "GET",
      headers: {
        Authorization: `${this.bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Erreur API :", errorMessage);
      throw new Error("Failed to fetch user public profile");
    }
  
    return await response.json();
  }
  

  public async getItemsCount(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/items/count`, {
      method: 'GET',
      headers: {
        "authorization": `${this.bearerToken}`,
      },
    });
    return await response.json();
  }
  
}

const apiService = new ApiService();

export default apiService;
