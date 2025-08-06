import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'


function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback((() => {

    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      string = string + "1234567890"
    }
    if (charAllowed) {
      string = string + "!@#$&+=-_%*"
    }


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char)
    }

    setPassword(pass)

  }), [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4'>
      <div className='w-full max-w-md p-6 rounded-2xl shadow-2xl bg-gray-900 text-white space-y-6'>
      <h1 className="text-4xl text-center text-orange-400 drop-shadow-md sm:whitespace-nowrap whitespace-normal leading-tight">
          🔐 Password Generator
        </h1>

        <div className='flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-inner'>
          <input
            className='w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 outline-none'
            type="text"
            value={password}
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-white font-medium px-4 py-2 rounded-none'
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between text-sm'>
            <label htmlFor='lengthManager' className='font-medium'>Length : <span className='text-orange-400'>{length}</span></label>
            <input
              className='w-2/3 cursor-pointer accent-orange-400'
              type="range"
              min={6}
              max={20}
              value={length}
              id='lengthManager'
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label htmlFor='charAllowed' className='font-medium'>Include Characters</label>
            <input
              className='w-5 h-5 cursor-pointer rounded-md accent-orange-400 border-2 border-gray-600 bg-gray-800 checked:border-orange-400 transition-all duration-200'
              type="checkbox"
              id='charAllowed'
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
            />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label htmlFor='numberAllowed' className='font-medium'>Include Numbers</label>
            <input
              className='w-5 h-5 cursor-pointer rounded-md accent-orange-400 border-2 border-gray-600 bg-gray-800 checked:border-orange-400 transition-all duration-200'
              type="checkbox"
              id='numberAllowed'
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
