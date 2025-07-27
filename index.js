"use strict";

class Alert {
  static defaultOptions = {
    icon: null,
    duration: 2500,
    href: null,
  };

  static element(title = "Info", text = "Alerta padrão", type, options = {}) {
    const alertIcons = {
      info: "ℹ️",
      warning: "⚠️",
      error: "⛔",
      success: "✔",
    };

    // Mescla as opções padrão com as opções fornecidas para cada alerta
    const mergedOptions = { ...this.defaultOptions, ...options };

    let alertArea = document.querySelector(".alert-area");
    if (!alertArea) {
      alertArea = document.createElement("div");
      alertArea.classList.add("alert-area");
      document.body.appendChild(alertArea);
    }

    let alert = document.createElement("a");
    let alertIcon = document.createElement("div");

    // Usa <span> para o ícone se não for imagem
    let icon =
      mergedOptions.icon === null
        ? document.createElement("span")
        : document.createElement("img");

    let alertText = document.createElement("div");
    let alertTitle = document.createElement("h3");
    let alertDescription = document.createElement("p");
    let progressBar = document.createElement("div");

    // Define as classes
    alert.classList.add("alert");
    alert.classList.add(type);
    alertIcon.classList.add("alert-icon");
    alertText.classList.add("alert-text");
    progressBar.classList.add("progress");

    // Define os valores
    alert.href = mergedOptions.href !== null ? mergedOptions.href : "#";

    if (icon.tagName === "SPAN") {
      icon.innerText = alertIcons[type] || "";
    } else {
      icon.src = mergedOptions.icon;
      icon.alt = type + " icon";
    }

    alertTitle.innerHTML = title;
    alertDescription.innerText = text;

    alertIcon.appendChild(icon);
    alertText.appendChild(alertTitle);
    alertText.appendChild(alertDescription);
    alert.appendChild(alertIcon);
    alert.appendChild(alertText);
    alert.appendChild(progressBar);
    alert.style.setProperty("--duration", mergedOptions.duration / 1000 + "s");

    alertArea.appendChild(alert);

    setTimeout(() => {
      alert.remove();
      // Remove a área de alertas se não houver mais alertas
      if (alertArea.querySelectorAll(".alert").length === 0) {
        alertArea.remove();
      }
    }, mergedOptions.duration +500);
  }

  // Exibe um alerta do tipo "warning"
  static warning(title, message, options = null) {
    this.element(title, message, "warning", options);
  }
  // Exibe um alerta do tipo "info"
  static info(title, message, options = null) {
    this.element(title, message, "info", options);
  }
  // Exibe um alerta do tipo "error"
  static error(title, message, options = null) {
    this.element(title, message, "error", options);
  }
  // Exibe um alerta do tipo "success"
  static success(title, message, options = null) {
    this.element(title, message, "success", options);
  }
}

Alert.success("Erro crítico", "Uma falha precisa de atenção", {
  duration: 5000,
});
Alert.warning("Erro crítico", "Uma falha precisa de atenção", {
  duration: 4000,
});
Alert.info("Erro crítico", "Uma falha precisa de atenção", {
  duration: 3000,
});
Alert.error("Erro crítico", "Uma falha precisa de atenção");
