import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";
import { RESTAURANT_ACTION } from "../../abstracts/constants";

class RestaurantAddFormComponent extends CustomElement {
  setEvent() {
    const form = document.querySelector("form");
    if (form)
      form.addEventListener("submit", (e) => {
        this.addRestaurant(e);
        this.hideModal();
        this.cleanForm();
      });

    document.getElementById("cancel").addEventListener("click", this.hideModal);
  }

  hideModal() {
    document.getElementById("add_modal").classList.remove("modal--open");
  }

  cleanForm() {
    document.querySelector("form").reset();
  }

  addRestaurant(e) {
    e.preventDefault();
    const category = document.querySelector("#category").value;
    const name = document.querySelector("#name").value;
    const distance = document.querySelector("#distance").value;
    const description = document.querySelector("#description").value;
    const link = document.querySelector("#link").value;
    const favorite = 0;

    const restaurant = {
      category,
      name,
      distance,
      description,
      link,
      favorite,
    };

    dispatcher(RESTAURANT_ACTION.ADD_RESTAURANT, restaurant);
  }

  template() {
    return `
    <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            <!-- 카테고리 -->
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category" required>
                <option value="">선택해 주세요</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="아시안">아시안</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="name" required />
            </div>

            <!-- 거리 -->
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              <select name="distance" id="distance" required>
                <option value="">선택해 주세요</option>
                <option value="5">5분 내</option>
                <option value="10">10분 내</option>
                <option value="15">15분 내</option>
                <option value="20">20분 내</option>
                <option value="30">30분 내</option>
              </select>
            </div>

            <!-- 설명 -->
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
            </div>

            <!-- 링크 -->
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="link" id="link" />
              <span class="help-text text-caption"
                >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
              >
            </div>

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
              <button-element id="cancel" btnType="button" btnClass="button--secondary" btnText="취소하기"></button-element>
              <button-element btnType="submit" btnClass="button--primary" btnText="추가하기"></button-element>
            </div>
          </form>
        `;
  }
}

customElements.define("restaurant-add-form", RestaurantAddFormComponent);

export default RestaurantAddFormComponent;
