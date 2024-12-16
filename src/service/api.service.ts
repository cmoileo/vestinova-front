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

  public async updateUserProfile(data: { firstname: string; lastname: string; email: string}): Promise<any> {
    const userId = this.getUserId();
  
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
  
    const response = await fetch(`${this.baseUrl}/auth/update/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `${this.bearerToken}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erreur lors de la mise à jour du profil");
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

  // public async getCart(): Promise<void> {
  //   const response = await fetch(`${this.baseUrl}/cart-items`, {
  //     headers: {
  //       "authorization": `${this.bearerToken}`,
  //     },
  //   });
  //   return await response.json();
  // }

  // public async handleAddToCart(itemId: string): Promise<void> {
  //   const response = await fetch(`${this.baseUrl}/cart/${itemId}`, {
  //     method: 'PUT',
  //     headers: {
  //       "authorization": `${this.bearerToken}`,
  //     },
  //   })
  // }

  // public async removeItemFromCart(itemId: string): Promise<void> {
  //   const response = await fetch(`${this.baseUrl}/cart/${itemId}`, {
  //     method: 'PATCH',
  //     headers: {
  //       "authorization": `${this.bearerToken}`,
  //     },
  //   })
  // }

  public getCartFromLocalStorage(): ItemType[] {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  
  public saveCartToLocalStorage(cart: ItemType[]): void {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  public addItemToCart(item: ItemType): void {
    const cart = this.getCartFromLocalStorage();
    const exists = cart.find((cartItem) => cartItem.id === item.id);
    if (!exists) {
      cart.push(item);
      this.saveCartToLocalStorage(cart);
    }
  }
  
  public removeItemFromCart(itemId: string): void {
    const cart = this.getCartFromLocalStorage();
    const updatedCart = cart.filter((item) => item.id !== itemId);
    this.saveCartToLocalStorage(updatedCart);
  }
  
  public clearCart(): void {
    localStorage.removeItem("cart");
  }
  

  public async likeItem(itemId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/items/${itemId}/like`, {
      method: 'POST',
      headers: {
        "authorization": `${this.bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Erreur lors du like de l'élément :", errorMessage);
      throw new Error("Failed to like item");
    }
  
    return await response.json();
  }
  
  public async getItemLikes(itemId: string): Promise<number> {
    const response = await fetch(`${this.baseUrl}/items/${itemId}/likes`, {
      method: 'GET',
      headers: {
        "authorization": `${this.bearerToken}`,
      },
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Erreur lors de la récupération des likes :", errorMessage);
      throw new Error("Failed to fetch likes for item");
    }
  
    return await response.json();
  }
  
  public async getLikedItems(): Promise<ItemType[]> {
    try {
      const response = await fetch(`${this.baseUrl}/user/liked-items`, {
        method: "GET",
        headers: {
          Authorization: `${this.bearerToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Unable to fetch liked items");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching liked items:", error);
      throw error;
    }
  }

  public async getItemsByCategory(categoryName: string): Promise<ItemType[]> {
    try {
      const response = await fetch(`${this.baseUrl}/items/category/${categoryName}`, {
        headers: {
          Authorization: `${this.bearerToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des articles par catégorie");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur dans getItemsByCategory :", error);
      throw error;
    }
  }
  

  
}

const apiService = new ApiService();

export default apiService;
