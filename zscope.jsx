import React, { useState } from 'react';
import '../styles/Horoscope.css';

function Horoscope() {
    const [name, setName] = useState("");
    const [month, setMonth] = useState("1");
    const [day, setDay] = useState("1");
    const [result, setResult] = useState(null);
  
    const handleChangeLanguage = (e) => {
    window.location.href = e.target.value;
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
    // ここで星座占いのロジックを実装し、setResultを使って結果を設定します
    try {
        const response = await fetch('http://127.0.0.1:5000', { // 余分なカンマを削除
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, month, day })
        });
    
        if (response.ok) {
          const data = await response.json();
          setResult(data.result); // 仮にresultというキーで結果が返ってくるとします
        } else {
          throw new Error('Server response was not ok.');
        }
      } catch (error) {
        console.error('There was a problem:', error);
      }
    };
  
    return (

    <div>
      <h2>Zscopeへようこそ REACT LOCAL Ver.</h2>
      <h3>まずはあなたの星座を占いましょう</h3>
      <label htmlFor="language-selector">Language:</label>
      <select id="language-selector" onChange={handleChangeLanguage}>
        <option value="http://3.22.71.185:5000/">English</option>
        <option value="http://127.0.0.1:5000/">日本語</option>
      </select>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名前 (Name):</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
        <br />
        <label htmlFor="month">誕生月 (Birth Month):</label>
        <select name="month" value={month} onChange={e => setMonth(e.target.value)} required>
          <option value="1">1月</option>
          <option value="2">2月</option>
          <option value="3">3月</option>
          <option value="4">4月</option>
          <option value="5">5月</option>
          <option value="6">6月</option>
          <option value="7">7月</option>
          <option value="8">8月</option>
          <option value="9">9月</option>
          <option value="10">10月</option>
          <option value="11">11月</option>
          <option value="12">12月</option>
        </select>
        <br />
        <label htmlFor="day">誕生日(Birth Date):</label>
        <input type="number" name="day" value={day} onChange={e => setDay(e.target.value)} min="1" max="31" required />
        <br />
        <button type="submit">星座占い</button>
      </form>
      {result && (
        <div>
          <hr />
          <h3>結果:</h3>
          <div>
            {Object.entries(result).map(([key, value]) => (
              <p key={key}>{`${key}: ${value}`}</p>
            ))}
          </div>
        </div>
    )}
      <h5>Copyrights 2023 Zscope by AW1728. All rights reserved.</h5>
    </div>
  );
}

export default Horoscope;
