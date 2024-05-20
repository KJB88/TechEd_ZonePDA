"use client";

export default function GlobalError({error, reset}:{error : Error & {digest?: string}; reset: () => void})
{
    return (
    <div>
        <h2>Oh no! Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again!</button>
    </div>
    )
}