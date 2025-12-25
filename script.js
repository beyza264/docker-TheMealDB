async function getMeal() {
    const input = document.getElementById("mealInput");
    const resultDiv = document.getElementById("result");
    const query = input.value.trim();

    if (!query) {
        alert("Lütfen bir yemek ismi girin!");
        return;
    }

    // Yükleniyor mesajı
    resultDiv.innerHTML = '<div class="placeholder-text">Aranıyor...</div>';

    try {
        // TheMealDB API'sine istek atıyoruz (API Key gerektirmez)
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        // Eğer yemek bulunamadıysa
        if (!data.meals) {
            resultDiv.innerHTML = '<div class="placeholder-text">😔 Yemek bulunamadı. Başka bir şey deneyin (İngilizce isimler kullanın).</div>';
            return;
        }

        // İlk sonucu alalım
        const meal = data.meals[0];

        // HTML kartını oluşturup ekrana basalım
        // Hocanın kodundaki 'JSON.stringify' yerine bunu kullanıyoruz.
        const html = `
            <div class="meal-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info">
                    <h3>${meal.strMeal}</h3>
                    <span class="category">${meal.strCategory} | ${meal.strArea} Mutfağı</span>
                    <p style="margin-top:10px; font-size:14px; color:#555;">
                        ${meal.strInstructions.substring(0, 100)}...
                    </p>
                    <a href="${meal.strYoutube}" target="_blank" style="color:#fda085; text-decoration:none; font-weight:bold;">Video Tarifi İzle →</a>
                </div>
            </div>
        `;
        
        resultDiv.innerHTML = html;

    } catch (error) {
        resultDiv.innerHTML = '<div class="placeholder-text">⚠️ Bir hata oluştu. Bağlantınızı kontrol edin.</div>';
        console.error(error);
    }
}
