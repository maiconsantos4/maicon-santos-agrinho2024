document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('products-list');
    const feedback = document.getElementById('feedback');
    const categorySelect = document.getElementById('product-category');
    const additionalFieldsContainer = document.getElementById('additional-fields');

    const additionalFields = {
        Eletrônicos: '',
        Alimentos: '',
        Roupas: `
            <label for="product-gender">Gênero:</label>
            <select id="product-gender" required>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
            </select>
            <label for="product-size">Tamanho:</label>
            <input type="text" id="product-size" required>
        `,
        Sapatos: `
            <label for="product-size">Tamanho do Sapato:</label>
            <input type="text" id="product-size" required>
        `
    };

    categorySelect.addEventListener('change', () => {
        additionalFieldsContainer.innerHTML = additionalFields[categorySelect.value] || '';
    });

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const productName = document.getElementById('product-name').value.trim();
            const productPrice = parseFloat(document.getElementById('product-price').value.trim());
            const productImage = document.getElementById('product-image').value.trim();
            const productDescription = document.getElementById('product-description').value.trim();
            const productBrand = document.getElementById('product-brand').value.trim();
            const productType = document.getElementById('product-type').value;
            const productCondition = document.getElementById('product-condition').value;
            const productDiscount = parseFloat(document.getElementById('product-discount').value.trim());
            const productRating = parseFloat(document.getElementById('product-rating').value.trim());
            const productCategory = document.getElementById('product-category').value;
            const productGender = document.getElementById('product-gender')?.value || '';
            const productSize = document.getElementById('product-size')?.value || '';

            if (!productName || isNaN(productPrice) || productPrice <= 0 || !productImage || !productDescription || !productBrand || isNaN(productDiscount) || productDiscount < 0 || productDiscount > 100 || isNaN(productRating) || productRating < 1 || productRating > 5) {
                showFeedback('Por favor, preencha todos os campos corretamente.', 'error');
                return;
            }

            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({
                name: productName,
                price: productPrice.toFixed(2),
                image: productImage,
                description: productDescription,
                brand: productBrand,
                type: productType,
                condition: productCondition,
                discount: productDiscount,
                rating: productRating,
                category: productCategory,
                gender: productGender,
                size: productSize
            });
            localStorage.setItem('products', JSON.stringify(products));

            showFeedback('Produto adicionado com sucesso!', 'success');
            productForm.reset();
            additionalFieldsContainer.innerHTML = '';
            displayProducts(products); // Atualiza a lista de produtos
        });
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">R$${product.price}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-brand">Marca: ${product.brand}</div>
                <div class="product-type">Tipo: ${product.type}</div>
                <div class="product-condition">Condição: ${product.condition}</div>
                <div class="product-discount">Desconto: ${product.discount}%</div>
                <div class="product-rating">Avaliação: ${product.rating} estrelas</div>
                ${product.category === 'Roupas' || product.category === 'Sapatos' ? `<div class="product-gender">Gênero: ${product.gender}</div>` : ''}
                ${product.size ? `<div class="product-size">Tamanho: ${product.size}</div>` : ''}
                <div class="product-actions">
                    <button class="btn adicionar-carrinho" data-id="${product.name}">Adicionar ao Carrinho</button>
                </div>
            `;
            productList.appendChild(productItem);
        });

        // Adicionar evento aos botões de adicionar ao carrinho
        const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');
        botoesAdicionarCarrinho.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const produtoId = e.target.getAttribute('data-id');
                adicionarAoCarrinho(produtoId);
            });
        });
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        displayProducts(products);
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }

    function adicionarAoCarrinho(produtoId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const produto = products.find(product => product.name === produtoId);
        if (produto) {
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(produto);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert('Produto adicionado ao carrinho com sucesso!');
        } else {
            alert('Produto não encontrado!');
        }
    }
});

