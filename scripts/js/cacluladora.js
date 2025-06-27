const btnCalcular = document.getElementById('btnCalc');

function calcular() {
    const total = parseInt(document.getElementById("total").value);
    const shippados = parseInt(document.getElementById("shippados").value);

    if (isNaN(total) || total <= 0) {
        document.getElementById("resultado").innerHTML = "<span class='highlight'>Insira um número válido de pedidos totais.</span>";
        return;
    }

    const maxErros997 = Math.floor(total * (1 - 0.997));
    const maxErros995 = Math.floor(total * (1 - 0.995));

    const expedir997 = total - maxErros997;
    const expedir995 = total - maxErros995;

    let texto = `
        <p><strong>Para atingir:</strong></p>
        <p>✅ <span class="highlight">99,70%</span>: Expedir pelo menos <span class="highlight">${expedir997}</span> pedidos</p>
        <p>❌ Pode atrasar até <span class="highlight">${maxErros997}</span> pedidos</p>
        <hr>
        <p>✅ <span class="highlight">99,50%</span>: Expedir pelo menos <span class="highlight">${expedir995}</span> pedidos</p>
        <p>❌ Pode atrasar até <span class="highlight">${maxErros995}</span> pedidos</p>
      `;

    // Verifica se o valor de shippados é válido para calcular a % real
    if (!isNaN(shippados) && shippados >= 0 && shippados <= total) {
        const percentual = ((shippados / total) * 100).toFixed(2);
        texto += `
          <hr>
          <p>📦 <strong>SLA Real:</strong> Você shippou <span class="highlight">${shippados}</span> de ${total} pedidos</p>
          <p>✅ SLA alcançado: <span class="highlight">${percentual}%</span></p>
        `;
    }

    document.getElementById("resultado").innerHTML = texto;
}

function keyboardShortcut(event) {
  if (event.key === 'Enter') {
    calcular();
  }
}

btnCalcular.addEventListener('click', calcular);

document.addEventListener('keydown', keyboardShortcut);
