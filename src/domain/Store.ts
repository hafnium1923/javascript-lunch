import {
  Category,
  Restaurant,
  CustomElement,
  Action,
  SortMethod,
  Index,
  MenuTap,
} from "../abstracts/types";
import { MENU, RESTAURANT_ACTION } from "../abstracts/constants";
import RestaurantsInstance from "./RestaurantsStore";

class Store {
  #subscribers: CustomElement[] = [];
  #modal_subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  modalSubscribe(element: CustomElement) {
    this.#modal_subscribers.push(element);
  }

  publish() {
    RestaurantsInstance.filterByCategory();
    RestaurantsInstance.sortRestaurants();

    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(RestaurantsInstance.restaurantList);
    });
  }

  publishMenu() {
    RestaurantsInstance.changeMenu();
    RestaurantsInstance.sortRestaurants();

    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(RestaurantsInstance.restaurantList);
    });
  }

  publishDetail(index: Index) {
    const restaurant = RestaurantsInstance.show(index);
    this.#modal_subscribers.forEach((modal_subscribers) => {
      modal_subscribers.rerender(restaurant);
    });
  }

  reducer = {
    [RESTAURANT_ACTION.ADD_RESTAURANT]: (action: Action) => {
      RestaurantsInstance.addRestaurant(action.data as Restaurant);
      RestaurantsInstance.menu === MENU.FAVORITE
        ? this.publishMenu()
        : this.publish();
    },
    [RESTAURANT_ACTION.FILTER_BY_CATEGORY]: (action: Action) => {
      RestaurantsInstance.category = action.data as Category;
      this.publish();
    },
    [RESTAURANT_ACTION.SORT_RESTAURANTS]: (action: Action) => {
      RestaurantsInstance.sortMethod = action.data as SortMethod;
      this.publish();
    },
    [RESTAURANT_ACTION.UPDATE_FAVORITE]: (action: Action) => {
      RestaurantsInstance.updateFavorite(action.data as Index);
      if (RestaurantsInstance.menu === MENU.FAVORITE) this.publishMenu();
    },
    [RESTAURANT_ACTION.SHOW_DETAIL]: (action: Action) => {
      this.publishDetail(action.data as Index);
    },
    [RESTAURANT_ACTION.UPDATE_MODAL_FAVORITE]: () => {
      this.publishMenu();
    },
    [RESTAURANT_ACTION.DELETE_RESTAURANT]: (action: Action) => {
      RestaurantsInstance.deleteRestaurant(action.data as Index);
      this.publishMenu();
    },
    [RESTAURANT_ACTION.CHANGE_MENU]: (action: Action) => {
      RestaurantsInstance.menu = action.data as MenuTap;
      this.publishMenu();
    },
  };
}

const StoreInstance = new Store();

export default StoreInstance;
