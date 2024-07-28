document.addEventListener('DOMContentLoaded', () => {
     const productForm = document.getElementById('product-form');
     const productList = document.getElementById('product-list');

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
             e.preventDefault();
             const productName = document.getElementById('product-name').Value;
             const productPrice = document.getElementById('product-price').Value;


            if (productName.trim() === '' || productPrice.trim() === '') {
                 alert('Por favor, preencha todos os campos')
                 return;   
            }

             const products =JSON.parse(localStorage.getItem('products')) || [];
             products.push({ name: productName, prise: productPrice});
             localStorage.setItem('products', JSON.stringify(products));

             alert('Produto adicionado com sucesso!');
             productForm.requestFullscreen();
        });       
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
         products.forEach(product => {
              const Li = document.createElement('li');
             li.textContent = '${priduct.name} - R$${produt.price}';
             productList.appendChild(li);
        });  
    }
});

document.addEventListener('DOMContentLoaded', () => {
     const productForm = document.getElementById('product-form');
     const feedback = document.getElementById('feedback');

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
             e.preventDefault();
             const productName = document.getElementById('product-name').value.trim();
             const productPrice = parseFloat(document.getElementById('product-price').value.trim());
             const productImage = document.getElementById('product-image').value.trim();
             const productDescription = document.getElementById('product-description').value.trim();

            if (!productName || isNaN(productPrice) || productPrice <= 0)  {
                 showFeedback('por favor, prencha todos os campos corretamente.', 'error');
                 return;               
            }

             const products =JSON.parse(localStorage.getItem('products')) || [];
             products.push({ name: productName, prise: productPrice.toFixed(2), imge: productImage, description: productDescription});
             localStorage.setItem('products', JSON.stringify(products));

             showFeedback('Produto adicionado com sucesso!', 'sucess');
             productForm.requestFullscreen();
             productForm.requestFullscreen();
        });        
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
         productList.innerHTML = '';
         products.forEach(product => {
             const productItem = document.createElement('div');
             productItem.className = 'product-item';
             productItem.innerHTML = `
             <img src="${product.image}" alt="${product.name}">
             <div class="product-name">${product.name}</div>
             <div class="product-price">R$${product.price}</div>
             <div class="product-description">${product.description}</div>
             <div class="product-actions">
             <button class="btn">Comprar</button>
             <button class="btn">Detalhes</button>
             </div>
        `;
         productList.appendChild(productItem);
    });
} 

    function showFeedback(messge, type) {
         feedback.textContent = messge;
         feedback.className = 'feedback ${type}';
         feedback.style.display = 'block';
         setTimeout(() => {
             feedback.style.display = 'none';
         }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
     const productForm = document.getElementById('product-form');
     const productList = document.getElementById('products-list');
     const feedback = document.getElementById('feedback');
     const filterBrand = document.getElementById('filter-brand');
     const filterPrice = document.getElementById('filter-price');
     const filterType = document.getElementById('filter-type');
     const filterCondition = document.getElementById('filter-condition');
    const filterRating = document.getElementById('filter-rating');
     const filterDiscount = document.getElementById('filter-discount');
     const applyFiltersButton = document.getElementById('apply-filters');

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
                 rating: productRating
            });
             localStorage.setItem('products', JSON.stringify(products));

             showFeedback('Produto adicionado com sucesso!', 'success');
             productForm.reset();
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
                 <div class="product-actions">
                 <button class="btn">Comprar</button>
                 <button class="btn">Detalhes</button>
                 </div>
             `;
             productList.appendChild(productItem);
        });
    }

    if (productList) {
         const products = JSON.parse(localStorage.getItem('products')) || [];
         displayProducts(products);
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
             const filteredProducts = JSON.parse(localStorage.getItem('products')) || [];
             const brandFilter = filterBrand.value.trim().toLowerCase();
             const priceFilter = parseFloat(filterPrice.value.trim());
             const typeFilter = filterType.value;
             const conditionFilter = filterCondition.value;
             const ratingFilter = parseFloat(filterRating.value.trim());
             const discountFilter = filterDiscount.checked;

            const filtered = filteredProducts.filter(product => {
                 const matchesBrand = !brandFilter || product.brand.toLowerCase().includes(brandFilter);
                 const matchesPrice = isNaN(priceFilter) || product.price <= priceFilter;
                 const matchesType = !typeFilter || product.type === typeFilter;
                 const matchesCondition = !conditionFilter || product.condition === conditionFilter;
                 const matchesRating = isNaN(ratingFilter) || product.rating >= ratingFilter;
                 const matchesDiscount = !discountFilter || product.discount > 0;

                 return matchesBrand && matchesPrice && matchesType && matchesCondition && matchesRating && matchesDiscount;
            });

             displayProducts(filtered);
        });
    }

    function showFeedback(message, type) {
         feedback.textContent = message;
         feedback.className = `feedback ${type}`;
         feedback.style.display = 'block';
         setTimeout(() => {
             feedback.style.display = 'none';
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
     const productForm = document.getElementById('product-form');
     const productList = document.getElementById('products-list');
     const feedback = document.getElementById('feedback');
     const categorySelect = document.getElementById('product-category');
     const additionalFieldsContainer = document.getElementById('additional-fields');
     const filterBrand = document.getElementById('filter-brand');
     const filterPrice = document.getElementById('filter-price');
     const filterType = document.getElementById('filter-type');
     const filterCondition = document.getElementById('filter-condition');
     const filterRating = document.getElementById('filter-rating');
     const filterDiscount = document.getElementById('filter-discount');
      const applyFiltersButton = document.getElementById('apply-filters');

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
                    <button class="btn">Comprar</button>
                    <button class="btn">Detalhes</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        displayProducts(products);
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const filteredProducts = JSON.parse(localStorage.getItem('products')) || [];
            const brandFilter = filterBrand.value.trim().toLowerCase();
            const priceFilter = parseFloat(filterPrice.value.trim());
            const typeFilter = filterType.value;
            const conditionFilter = filterCondition.value;
            const ratingFilter = parseFloat(filterRating.value.trim());
            const discountFilter = filterDiscount.checked;

            const filtered = filteredProducts.filter(product => {
                const matchesBrand = !brandFilter || product.brand.toLowerCase().includes(brandFilter);
                const matchesPrice = isNaN(priceFilter) || product.price <= priceFilter;
                const matchesType = !typeFilter || product.type === typeFilter;
                const matchesCondition = !conditionFilter || product.condition === conditionFilter;
                const matchesRating = isNaN(ratingFilter) || product.rating >= ratingFilter;
                const matchesDiscount = !discountFilter || product.discount > 0;

                return matchesBrand && matchesPrice && matchesType && matchesCondition && matchesRating && matchesDiscount;
            });

            displayProducts(filtered);
        });
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('products-list');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Filtrar e exibir produtos
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
                    <button class="btn">Comprar</button>
                    <button class="btn">Detalhes</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    // Carregar produtos do localStorage ao carregar a página
    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        displayProducts(products);
    }

    // Filtrar produtos com base na pesquisa
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
            displayProducts(filteredProducts);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const carrinhoLink = document.getElementById('carrinho-link');
    const carrinhoCount = document.getElementById('carrinho-count');
    const carrinhoImg = document.getElementById('carrinho-img');

    // Inicializar o carrinho
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Atualizar a contagem do carrinho
    const atualizarContagemCarrinho = () => {
        carrinhoCount.textContent = carrinho.length;
    };

    // Adicionar ao carrinho
    const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');
    botoesAdicionarCarrinho.forEach(botao => {
        botao.addEventListener('click', () => {
            carrinho.push('produto');
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarContagemCarrinho();

            // Adicionar efeito de clique
            carrinhoImg.classList.add('clicked');

            // Remover a classe após a animação terminar
            setTimeout(() => {
                carrinhoImg.classList.remove('clicked');
            }, 500);
        });
    });

    // Função para curtir/descurtir produto
    const botoesCurtirProduto = document.querySelectorAll('.curtir-produto');
    botoesCurtirProduto.forEach(botao => {
        botao.addEventListener('click', () => {
            botao.classList.toggle('curtido');
        });
    });

    atualizarContagemCarrinho();
});

document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoCount = document.getElementById('carrinho-count');
    
    // Atualiza o contador de itens no carrinho
    function atualizarContador() {
        carrinhoCount.textContent = carrinho.length;
    }
    
    atualizarContador();
    
    // Função para adicionar item ao carrinho
    function adicionarAoCarrinho(produtoId) {
        if (!carrinho.includes(produtoId)) {
            carrinho.push(produtoId);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarContador();
        }
    }
    
    // Adiciona eventos de clique aos botões "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const produtoId = e.target.closest('.produto').dataset.id;
            adicionarAoCarrinho(produtoId);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItems = document.getElementById('carrinho-items');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        carrinhoItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }
    
    carrinho.forEach(id => {
        // Aqui você deve adicionar lógica para buscar e exibir os detalhes do produto baseado no ID
        // Exemplo:
        carrinhoItems.innerHTML += `<p>Produto ID: ${id}</p>`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItems = document.getElementById('carrinho-items');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalPreco = document.getElementById('total-preco');
    
    if (carrinho.length === 0) {
        carrinhoItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalPreco.textContent = 'Total: R$ 0,00';
        return;
    }
    
    let precoTotal = 0;
    
    // Mock de produtos para demonstração, substitua com dados reais
    const produtos = {
        produto1: { nome: 'Produto 1', preco: 10.00, imagem: 'Fruta Melancia PNG Transparente Sem Fundo.jpg' },
        produto2: { nome: 'Produto 2', preco: 20.00, imagem: 'Morangos PNG Transparente Sem Fundo.jpg' },
        // Adicione outros produtos aqui...
    };
    
    carrinho.forEach(id => {
        const produto = produtos[id];
        if (produto) {
            precoTotal += produto.preco;
            carrinhoItems.innerHTML += `
                <div class="item-carrinho">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <div class="info">
                        <h2>${produto.nome}</h2>
                        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                        <button class="remover-item" data-id="${id}">Remover</button>
                    </div>
                </div>
            `;
        }
    });
    
    totalPreco.textContent = `Total: R$ ${precoTotal.toFixed(2)}`;
    
    // Adiciona funcionalidade para remover itens
    const botoesRemover = document.querySelectorAll('.remover-item');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const produtoId = e.target.dataset.id;
            const index = carrinho.indexOf(produtoId);
            if (index > -1) {
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                window.location.reload();
            }
        });
    });
});

document.getElementById('product-image').addEventListener('input', function() {
    var imageUrl = this.value;
    var previewImg = document.getElementById('preview-img');
    
    if (imageUrl) {
        previewImg.src = imageUrl;
        previewImg.style.display = 'block';
    } else {
        previewImg.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('product-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o recarregamento da página

        var name = document.getElementById('product-name').value;
        var price = document.getElementById('product-price').value;
        var imageUrl = document.getElementById('product-image').value;
        var description = document.getElementById('product-description').value;
        var brand = document.getElementById('product-brand').value;
        var type = document.getElementById('product-type').value;
        var condition = document.getElementById('product-condition').value;
        var rating = document.getElementById('product-rating').value;
        var category = document.getElementById('product-category').value;

        // Validação básica
        if (!name || !price || !imageUrl || !description || !brand || !type || !condition || !rating || !category) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Cria um novo elemento para o produto
        var productDiv = document.createElement('div');
        productDiv.classList.add('produto');
        productDiv.innerHTML = `
            <img src="${imageUrl}" alt="${name}" style="width: 150px; height: auto;">
            <h2>${name}</h2>
            <p>${description}</p>
            <p>Preço: R$${price}</p>
            <p>Marca: ${brand}</p>
            <p>Tipo: ${type}</p>
            <p>Condição: ${condition}</p>
            <p>Avaliação: ${rating}⭐</p>
            <p>Categoria: ${category}</p>
            <button class="adicionar-carrinho">Adicionar ao Carrinho</button>
            <button class="curtir-produto">❤</button>
        `;

        // Adiciona o novo produto à lista de produtos
        document.getElementById('products-list').appendChild(productDiv);

        // Limpa o formulário após adicionar o produto
        form.reset();
        document.getElementById('preview-img').style.display = 'none';
        document.getElementById('product-image').value = '';
    });
});

