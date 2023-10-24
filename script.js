 // var csrftoken = '{{request.COOKIES.csrftoken}}'
    // var siteurl = '{{CURRENT_SITE_URL}}'
    let i = 0;
    const userQualForm = document.querySelectorAll(".userQual-form");
    const formList = [];
    const fieldItemsInnerList = document.querySelectorAll('.fieldItems-inner');
    fieldItemsInnerList.forEach(fieldItemsInnerList => {
      fieldItemsInnerList.addEventListener("click", () => {
        //toggle checked&unchecked
        const childElementToggle = fieldItemsInnerList.querySelector('.checked--box, .unChecked--box');
        // console.log(childElementToggle);
        if (childElementToggle) {
          childElementToggle.classList.toggle("checked--box");
          childElementToggle.classList.toggle("unChecked--box");
        }
        //unique form
        if (i === 2) {
          const checkboxes = userQualForm[i].querySelectorAll('.fieldItems-inner .checked--box');
          if (checkboxes.length > 1) {
            checkboxes.forEach(checkbox => {
              if (checkbox !== childElementToggle) {
                checkbox.classList.remove("checked--box");
                checkbox.classList.add("unChecked--box");
              }
            });
          }
        }
        // for select msg none,when checked is present
        const pleaseSelects = document.querySelectorAll(".pleaseSelect");
        const isCheckboxThere = document.querySelectorAll('.userQual-form.show .fieldItems-inner .checked--box');
        isCheckboxThere.forEach(isCheckboxThere => {
          if (isCheckboxThere) {
            pleaseSelects.forEach(pleaseSelects => {
              pleaseSelects.style.display = "none"
            })
          }
        })

      });
    });
    //others append
    const fieldItemsOther = document.querySelectorAll('.other--fieldItems')
    const othersTextArea = document.querySelectorAll('.textArea-box')
    const othersFieldHandler = () => {
      fieldItemsOther.forEach(fieldItemsOther => {
        fieldItemsOther.addEventListener("click", () => {
          const childElement = fieldItemsOther.querySelector('.activeOthers')
          if (childElement.classList.contains("checked--box")) {
            childElement.parentElement.classList.add('active-other-fieldItems');
            childElement.parentElement.nextElementSibling.style.display = "block"
          }
          else {
            childElement.parentElement.classList.remove('active-other-fieldItems');
            childElement.parentElement.nextElementSibling.style.display = "none"
          }
        });
      });
    };
    othersFieldHandler()

    console.log("userQualForm.length", userQualForm.length);
    console.log("userQualForm", userQualForm);

    // let a = 0
    // const backBtn = document.querySelectorAll(".back")
    // backBtn.forEach(backBtns => {
    //   backBtns.addEventListener("click", () => {
    //     userQualForm[a].classList.remove("show");
    //     if (a > 0) {
    //       // a += 1;
    //       // a = a - 1
    //       a = a - 1;
    //       console.log("a", a);
    //     }
    //     userQualForm[a].classList.add("show");
    //   })
    // })

    // gpt
    const backBtn = document.querySelectorAll(".back");
    backBtn.forEach((button) => {
      button.addEventListener("click", () => {
        userQualForm[i].classList.remove("show");
        if (i > 0) {
          i--;
          console.log(i);
        }
        userQualForm[i].classList.add("show");
      });
    });




    // otherInput.addEventListener("onkeyup",checkValueisPresent())
    // otherInput.value !== "" ? otherInput.style.border = "1px solid pink" : otherInput.style.border = "1px solid red"
    // next script

    const nextBtn = document.querySelectorAll(".next-outer-btn")
    const fieldItemsInner = document.querySelectorAll(".fieldItems-inner")
    userQualForm[i].classList.add("show")
    nextBtn.forEach(nextBtn => {
      nextBtn.addEventListener("click", (e) => {
        userQualForm.forEach(e => event.preventDefault());
        const checkedBoxes = userQualForm[i].querySelectorAll(".checked--box");
        const pleaseSelect = userQualForm[i].querySelector(".pleaseSelect");
        var otherInput = userQualForm[i].querySelector(".other-Input-item");
        var activeOthers = userQualForm[i].querySelector(".activeOthers");
        if (checkedBoxes.length > 0) {
          if (activeOthers && activeOthers.classList.contains("checked--box") &&
            (!otherInput || otherInput.value.trim() === "")) {
            // otherInput.style.border = "1px solid red";
            checkValueisPresent()
            // otherInput.addEventListener("keyup",checkValueisPresent())
          }
          else {
            const arrList = [];
            const container = document.querySelectorAll('.userQual-form.show .fieldItems-inner');
            container.forEach(container => {
              const childof = container.querySelector('div');
              if (childof.classList.contains("checked--box")) {
                const values = childof.parentElement.querySelector("label");
                const checkedValues = values.textContent.trim();
                if (checkedValues === "Other (Specify)") {
                  const valOthers = userQualForm[i].querySelector('.other-Input-item')
                  var otherInputValue = valOthers.value.trim()
                  arrList.push(otherInputValue);
                }
                else {
                  arrList.push(checkedValues);
                }
              }
            })
            formList[i] = arrList
            console.log("formData", formList);
            if (i < userQualForm.length - 1) {
              userQualForm[i].classList.remove("show");
              i += 1;
              userQualForm[i].classList.add("show");
            }
          }
        }
        else {
          pleaseSelect.style.display = "block";
        }
      });
    });

    function checkValueisPresent() {
      var otherInput = userQualForm[i].querySelector(".other-Input-item");
      otherInput.value.trim() !== "" ?
        otherInput.style.border = "1px solid #57BEFF" : otherInput.style.border = "1px solid red"
    }

    //submit area
    const submitBtn = document.getElementById('submit-values');
    submitBtn.addEventListener("click", () => {
      const organizationSizeString = formList[2].join(', ');
      const formSubmitData = {
        video_categories: formList[0],
        video_goal: formList[1],
        organisation_size: organizationSizeString,
        user_role: formList[3],
        video_publish_in: formList[4],
      };
      let video_categories = formSubmitData.video_categories;
      let video_goal = formSubmitData.video_goal;
      let organisation_size = formSubmitData.organisation_size;
      let user_role = formSubmitData.user_role;
      let video_publish_in = formSubmitData.video_publish_in;

      var checkedBoxes = userQualForm[i].querySelectorAll(".checked--box");
      if (checkedBoxes.length > 0) {
        var otherInput = userQualForm[i].querySelector(".other-Input-item");
        var activeOthers = userQualForm[i].querySelector(".activeOthers");
        if (activeOthers && activeOthers.classList.contains("checked--box") &&
          (!otherInput || otherInput.value.trim() === "")) {
          // otherInput.style.border = "1px solid red";
        }
        else {
          console.log('in ajax');
          // $.ajax({
          //   type: "POST",
          //   // url: siteurl + "/api/v1/user/collection/",
          //   data: { video_categories: video_categories, video_goal: video_goal, organisation_size: organisation_size, user_role: user_role, video_publish_in: video_publish_in },
          //   headers: { 'Access-Control-Allow-Origin': '*', "X-CSRFToken": csrftoken },
          //   success: function (result) {
          //     let isSuccess = result.success
          //     if (isSuccess) {
          //       window.location.href = `${siteurl}/dashboard`;
          //       console.log("redirected");
          //     }
          //   },
          //   error: function (xhr, status, error) {
          //     console.error("POST request failed:", error);
          //   }
          // });
        }
      }
    })


    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });