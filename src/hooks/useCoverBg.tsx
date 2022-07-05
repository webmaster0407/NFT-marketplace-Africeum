export function useCoverBg(image: string, size :any = "cover") {
    return { background: `top / ${size} no-repeat url(${image ? "'" +image+"'" : '/art.png'})` };
}

