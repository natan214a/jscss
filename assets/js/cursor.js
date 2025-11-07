function customCursor() {
    if (window.matchMedia('(min-width: 1200px)').matches) {
        const cursor = document.querySelector('.cb-cursor')
        const cursorInner = cursor.querySelector('.cb-cursor-inner')
        const cursorMedia = cursor.querySelector('.cb-cursor-media')
        const cursorText = cursor.querySelector('.cb-cursor-text')

        const cursorWidth = cursor.offsetWidth
        const cursorHeight = cursor.offsetHeight

        let lastX = window.innerWidth / 2
        let lastY = window.innerHeight / 2

        let timeout

        document.addEventListener('mousemove', (event) => {
            clearTimeout(timeout) // limpar o timeout existente quando o mouse se move

            const x = event.clientX - cursorWidth / 2
            const y = event.clientY - cursorHeight / 2

            const deltaX = event.clientX - lastX
            const deltaY = event.clientY - lastY

            const rotateX = deltaY * 0.1
            const rotateY = deltaX * -0.1

            let scaleX = 1
            let scaleY = 1

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                scaleY = 0.95 // diminuir o scaleY se o movimento for mais horizontal
            } else {
                scaleX = 0.95 // diminuir o scaleX se o movimento for mais vertical
            }

            cursor.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleX}, ${scaleY})`
            cursor.classList.remove('-hidden')

            lastX = event.clientX
            lastY = event.clientY

            // definir um novo timeout para redefinir a escala do cursor se o mouse parar de se mover
            timeout = setTimeout(() => {
                cursor.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1, 1)`
            }, 50) // ajuste o valor de delay conforme necessário
        })

        document.addEventListener('mouseleave', () => {
            cursor.classList.add('-hidden')
        })

        document.querySelectorAll('[data-cursor-text]').forEach((anchor) => {
            anchor.addEventListener('mouseenter', () => {
                cursorText.innerHTML = anchor.getAttribute('data-cursor-text')
            })

            anchor.addEventListener('mouseleave', () => {
                cursorText.innerHTML = ''
            })
        })

        document.querySelectorAll('[data-cursor-media]').forEach((anchor) => {
            anchor.addEventListener('mouseenter', () => {
                cursor.classList.add('is-media')
            })

            anchor.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-media')
            })
        })

        document.querySelectorAll('[data-cursor-custom]').forEach((anchor) => {
            anchor.addEventListener('mouseenter', () => {
                cursor.classList.add('is-active')
            })

            anchor.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-active')
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', customCursor)
window.addEventListener('load', customCursor)
window.addEventListener('resize', customCursor)