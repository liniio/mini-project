document.getElementById("convertButton").addEventListener("click", async () => {
    const sourceCurrency = document.getElementById("sourceCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const targetCurrency = document.getElementById("targetCurrency").value;
    const resultElement = document.getElementById("result");

    // Kiểm tra nếu người dùng đã chọn cùng một loại tiền
    if (sourceCurrency === targetCurrency) {
        resultElement.textContent = "Không thể chuyển đổi cùng một loại tiền.";
        return;
    }

    // Kiểm tra nếu số tiền không hợp lệ
    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = "Số tiền không hợp lệ. Vui lòng nhập lại.";
        return;
    }

    // Sử dụng API của openexchangerates.org để lấy tỷ giá
    try {
        const exchangeRateResponse = await fetch(`https://openexchangerates.org/api/latest.json?app_id=686bd6f1bffc4eb9ace3a11cc4ce7ed0&base=USD`);
        const exchangeRateData = await exchangeRateResponse.json();
        
        // Kiểm tra xem tiền tệ có tồn tại trong dữ liệu trả về không
        if (!exchangeRateData.rates[targetCurrency]) {
            resultElement.textContent = "Loại tiền đích không hợp lệ.";
            return;
        }

        // Thực hiện chuyển đổi tiền tệ và cập nhật kết quả lên trang
        const convertedAmount = amount * exchangeRateData.rates[targetCurrency];
        resultElement.textContent = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
    } catch (error) {
        console.error(error);
        resultElement.textContent = "Đã xảy ra lỗi khi thực hiện chuyển đổi tiền tệ.";
    }
});
