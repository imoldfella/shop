package reformat

import (
	"encoding/json"
	"log"
	"os"
	"strings"
)

type OutputCode struct {
	Code        string            `json:"code,omitempty"`
	Description map[string]string `json:"description,omitempty"`
}

type Ent struct {
	ENT []string `json:"ent,omitempty"`
}

func BuildCodes() {
	x := make([]Ent, 0)
	cwd, _ := os.Getwd()

	log.Printf("%s", cwd)
	b, _ := os.ReadFile("./shop500.json")
	json.Unmarshal(b, &x)

	fmtc := func(n string) string {
		a := "00000"[0:5-len(n)] + n

		return a
	}

	out := make([]*OutputCode, 0)
	for _, i := range x {
		cd := fmtc(i.ENT[0])
		gpt3, _ := os.ReadFile("gpt3/" + cd + ".txt")
		out = append(out, &OutputCode{
			Code: cd,
			Description: map[string]string{
				"short": i.ENT[1],
				"long":  i.ENT[2],
				"gpt3":  strings.TrimSpace(string(gpt3)),
			},
		})

	}

	b, _ = json.Marshal(out)
	os.WriteFile("shop.json", b, os.ModePerm)
}
