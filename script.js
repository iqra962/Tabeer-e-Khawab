
    const modal = document.getElementById("modal");
    const close = document.getElementById("close");
    const form = document.getElementById("dreamForm");
    const success = document.getElementById("success");
    const categoryText = document.getElementById("categoryText");

    function openModal(category) {
      categoryText.textContent = category ? "Category: " + category + ". Apna khwab share karein." : "Apna khwab share karein.";
      form.classList.remove("hide");
      success.classList.remove("show");
      modal.classList.add("open");
    }

    document.querySelectorAll("[data-open]").forEach((button) => {
      button.addEventListener("click", () => openModal(button.dataset.cat || ""));
    });

    close.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.classList.remove("open");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("hide");
      success.classList.add("show");
    });

    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const item = question.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item.open").forEach((openItem) => {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("open");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });

    // Typing animation script
    const typedTextElement = document.getElementById('typed-text');
    const cursor = document.querySelector('.typing-cursor');

    if (typedTextElement && cursor) {
      const originalNodes = Array.from(typedTextElement.childNodes).map((node) => node.cloneNode(true));
      typedTextElement.textContent = '';

      const speed = 42;

      function typeNode(sourceNode, targetParent, onComplete) {
        if (sourceNode.nodeType === Node.TEXT_NODE) {
          const text = sourceNode.textContent;
          let charIndex = 0;

          function typeCharacter() {
            if (charIndex < text.length) {
              targetParent.append(text.charAt(charIndex));
              charIndex++;
              setTimeout(typeCharacter, speed);
              return;
            }

            onComplete();
          }

          typeCharacter();
          return;
        }

        if (sourceNode.nodeType === Node.ELEMENT_NODE) {
          const element = sourceNode.cloneNode(false);
          targetParent.appendChild(element);
          typeNodes(Array.from(sourceNode.childNodes), element, onComplete);
          return;
        }

        onComplete();
      }

      function typeNodes(nodes, targetParent, onComplete) {
        let nodeIndex = 0;

        function nextNode() {
          if (nodeIndex >= nodes.length) {
            onComplete();
            return;
          }

          typeNode(nodes[nodeIndex], targetParent, () => {
            nodeIndex++;
            nextNode();
          });
        }

        nextNode();
      }

      typeNodes(originalNodes, typedTextElement, () => {
        cursor.style.animation = 'blink-caret 0.75s step-end infinite';
      });
    }
    // End of typing animation script