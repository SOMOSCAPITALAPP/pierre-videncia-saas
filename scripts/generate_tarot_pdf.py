from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


OUTPUT = "public/tarot-marselha-pierre-videncia.pdf"


def txt(value: str) -> str:
    return value.encode("utf-8").decode("unicode_escape")


doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=2 * cm,
    leftMargin=2 * cm,
    topMargin=2 * cm,
    bottomMargin=2 * cm,
)

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="TitleGold",
        parent=styles["Title"],
        textColor=colors.HexColor("#6d3bbd"),
        fontName="Times-Bold",
        fontSize=24,
        leading=30,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="Sub",
        parent=styles["Normal"],
        textColor=colors.HexColor("#3c2a18"),
        fontName="Times-Italic",
        fontSize=12,
        leading=17,
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        name="H",
        parent=styles["Heading2"],
        textColor=colors.HexColor("#6d3bbd"),
        fontName="Times-Bold",
        fontSize=15,
        leading=20,
        spaceBefore=12,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName="Times-Roman",
        fontSize=11.5,
        leading=17,
        textColor=colors.HexColor("#1f1722"),
        spaceAfter=9,
    )
)
styles.add(
    ParagraphStyle(
        name="Small",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#5f5564"),
        spaceBefore=14,
    )
)

story = [
    Paragraph("Pierre Videncia", styles["TitleGold"]),
    Paragraph(txt("Uma breve hist\\u00f3ria do Tar\\u00f4 de Marselha"), styles["Sub"]),
    HRFlowable(width="100%", thickness=1, color=colors.HexColor("#d9aa4f")),
    Spacer(1, 0.3 * cm),
]

sections = [
    (
        txt("O que \\u00e9 o Tar\\u00f4 de Marselha?"),
        txt(
            "O Tar\\u00f4 de Marselha \\u00e9 uma das tradi\\u00e7\\u00f5es simb\\u00f3licas mais conhecidas do tar\\u00f4 europeu. "
            "Suas imagens diretas, suas cores marcantes e seus personagens arquet\\u00edpicos formam uma linguagem visual usada h\\u00e1 s\\u00e9culos "
            "como apoio para reflex\\u00e3o, medita\\u00e7\\u00e3o e orienta\\u00e7\\u00e3o espiritual."
        ),
    ),
    (
        txt("A liga\\u00e7\\u00e3o com a Fran\\u00e7a"),
        txt(
            "Embora a hist\\u00f3ria do tar\\u00f4 tenha ra\\u00edzes em diferentes regi\\u00f5es da Europa, o nome Marselha se tornou refer\\u00eancia "
            "pela for\\u00e7a dos baralhos impressos na Fran\\u00e7a, especialmente entre os s\\u00e9culos XVII e XVIII. "
            "A cidade de Marseille e os mestres impressores franceses ajudaram a consolidar uma est\\u00e9tica reconhecida at\\u00e9 hoje."
        ),
    ),
    (
        txt("Os 22 Arcanos Maiores"),
        txt(
            "No ritual de Pierre Videncia, os 22 Arcanos Maiores representam grandes movimentos da alma: in\\u00edcio, escolha, transforma\\u00e7\\u00e3o, "
            "for\\u00e7a, cura, clareza e conclus\\u00e3o. Cada carta n\\u00e3o \\u00e9 uma senten\\u00e7a fixa. Ela funciona como um espelho simb\\u00f3lico "
            "para observar o momento com mais consci\\u00eancia."
        ),
    ),
    (
        txt("O ritual da tiragem em cruz"),
        txt(
            "A pessoa escolhe um n\\u00famero entre 1 e 9. Depois, o baralho \\u00e9 embaralhado e cinco cartas s\\u00e3o abertas em cruz: "
            "Situa\\u00e7\\u00e3o atual, Obst\\u00e1culo, Conselho, Evolu\\u00e7\\u00e3o e Resultado. "
            "As posi\\u00e7\\u00f5es seguem o n\\u00famero escolhido: X, 2X, 3X, 4X e 5X, sempre dentro dos 22 Arcanos Maiores."
        ),
    ),
    (
        txt("Como Pierre interpreta"),
        txt(
            "Pierre se apresenta como um tar\\u00f3logo franc\\u00eas vivendo no Brasil. Ele une a tradi\\u00e7\\u00e3o francesa do Tar\\u00f4 de Marselha "
            "com uma linguagem brasileira, acolhedora e direta. A leitura considera a pergunta, o tema, o n\\u00famero escolhido, o signo e o n\\u00famero de vida."
        ),
    ),
    (
        txt("Uma pr\\u00e1tica espiritual e \\u00e9tica"),
        txt(
            "Toda leitura espiritual deve ser recebida como apoio de reflex\\u00e3o. Ela n\\u00e3o substitui decis\\u00f5es m\\u00e9dicas, jur\\u00eddicas, "
            "financeiras ou psicol\\u00f3gicas. O valor do tar\\u00f4 est\\u00e1 em iluminar possibilidades, n\\u00e3o em retirar a liberdade de escolha."
        ),
    ),
]

for title, body in sections:
    story.append(Paragraph(title, styles["H"]))
    story.append(Paragraph(body, styles["Body"]))

story.extend(
    [
        Spacer(1, 0.4 * cm),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor("#d9aa4f")),
        Paragraph(
            txt(
                "Pierre Videncia \\u2014 Tar\\u00f3logo franc\\u00eas vivendo no Brasil. "
                "Leituras simb\\u00f3licas, acolhedoras e sem promessas absolutas."
            ),
            styles["Small"],
        ),
    ]
)

doc.build(story)
print(OUTPUT)
