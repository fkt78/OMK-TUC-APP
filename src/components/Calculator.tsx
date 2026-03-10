import React, { useState, useCallback } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingOperand, setWaitingOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    setDisplay((prev) => {
      if (waitingOperand) return digit;
      if (prev === '0' && digit !== '.') return digit;
      if (digit === '.' && prev.includes('.')) return prev;
      return prev + digit;
    });
    setWaitingOperand(false);
  }, [waitingOperand]);

  const inputOperator = useCallback((op: string) => {
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
      setOperator(op);
      setWaitingOperand(true);
      return;
    }
    if (operator && !waitingOperand) {
      const result = calculate(prevValue, current, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }
    setOperator(op);
    setWaitingOperand(true);
  }, [display, prevValue, operator, waitingOperand]);

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const handleEquals = useCallback(() => {
    const current = parseFloat(display);
    if (prevValue === null || operator === null) return;
    const result = calculate(prevValue, current, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingOperand(true);
  }, [display, prevValue, operator]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingOperand(false);
  }, []);

  const buttonRows: string[][] = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handleButtonClick = (key: string) => {
    if (key === 'C') {
      handleClear();
      return;
    }
    if (key === '=') {
      handleEquals();
      return;
    }
    if (['+', '−', '×', '÷'].includes(key)) {
      inputOperator(key);
      return;
    }
    if (key === '±') {
      setDisplay((prev) => String(-parseFloat(prev)));
      return;
    }
    if (key === '%') {
      setDisplay((prev) => String(parseFloat(prev) / 100));
      return;
    }
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)) {
      inputDigit(key);
    }
  };

  return (
    <div className="calculator">
      <h2>電卓</h2>
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {buttonRows.map((row, rowIdx) =>
          row.map((key) => (
            <button
              key={`${rowIdx}-${key}`}
              type="button"
              className={`calculator-btn ${key === '=' ? 'calculator-btn-equals' : ''} ${['+', '−', '×', '÷'].includes(key) ? 'calculator-btn-op' : ''} ${key === '0' ? 'calculator-btn-zero' : ''}`}
              onClick={() => handleButtonClick(key)}
            >
              {key}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Calculator;
